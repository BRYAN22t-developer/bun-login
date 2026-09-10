import { refreshTokensRepository } from "../repositories/json-refresh-tokens";
import { JsonAuthRepository } from "../repositories/json-auth";
import type { Result } from "../types/result";
import { joseJwtService } from "./jose-jwt.service";
import crypto from "node:crypto";
import type { RefreshToken } from "../types/repositories";

const authRepository = new JsonAuthRepository();

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export async function addRefreshTokenService(
  userId: string,
): Promise<Result<{ result: RefreshToken; token: string }, Error>> {
  const token = crypto.randomBytes(40).toHex().toString();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const refreshToken = {
    id: crypto.randomUUID(),
    userId,
    token,
    expiresAt,
    revokedAt: null,
    createdAt: new Date(),
  };

  const result = await refreshTokensRepository.add(refreshToken);

  if (!result) {
    return { ok: false, error: new Error("repository error") };
  }

  return { ok: true, data: { result, token } };
}

export async function getRefreshTokenService(
  token: string,
): Promise<Result<Tokens, Error>> {
  const refreshToken = await refreshTokensRepository.getByToken(token);

  if (!refreshToken) {
    return { ok: false, error: new Error("Refresh does not exist") };
  }

  if (refreshToken.revokedAt) {
    return { ok: false, error: new Error("Revoked refresh token") };
  }

  const today = new Date(Date.now());

  if (refreshToken.expiresAt < today) {
    return { ok: false, error: new Error("Expired refresh token") };
  }

  const user = await authRepository.findById(refreshToken.userId);

  if (!user) {
    return { ok: false, error: new Error("Internal server error") };
  }

  try {
    const accessToken = await joseJwtService.sign({
      id: user.id,
      email: user.email,
    });

    const newRefreshToken = await updateRefreshToken(
      user.id,
      refreshToken.token,
    );

    if (!newRefreshToken) {
      return { ok: false, error: new Error("Internal repository token error") };
    }

    return {
      ok: true,
      data: { accessToken, refreshToken: newRefreshToken.token },
    };
  } catch (e) {
    return { ok: false, error: new Error("Internal token error") };
  }
}

async function updateRefreshToken(userId: string, oldToken: string) {
  const token = crypto.randomBytes(40).toHex().toString();

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const refreshToken = {
    id: crypto.randomUUID(),
    userId,
    token,
    expiresAt,
    revokedAt: null,
    createdAt: new Date(),
  };

  const result = await refreshTokensRepository.reemplace(
    oldToken,
    refreshToken,
  );

  return result;
}

export async function deleteRefreshTokenService(token: string) {
  await refreshTokensRepository.delete(token);
}
