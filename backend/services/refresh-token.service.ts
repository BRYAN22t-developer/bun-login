import { refreshTokensRepository } from "../repositories/json-refresh-tokens";
import { JsonUsersRepository } from "../repositories/json-users";
import type { Result } from "../types/result";
import { joseJwtService } from "./jose-jwt.service";

const usersRepository = new JsonUsersRepository();

export async function refreshTokenService(
  token: string,
): Promise<Result<string, Error>> {
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

  const user = await usersRepository.findById(refreshToken.userId);

  if (!user) {
    return { ok: false, error: new Error("Internal server error") };
  }

  try {
    const accessToken = await joseJwtService.sign({
      id: user.id,
      email: user.email,
    });

    return { ok: true, data: accessToken };
  } catch (e) {
    return { ok: false, error: new Error("Internal token error") };
  }
}
