import type {
  RefreshToken,
  RefreshTokensRepository,
} from "../types/repositories";
import refreshTokens from "./db/tokens.json";

export class JsonRefreshTokensRepository implements RefreshTokensRepository {
  async add(refreshToken: RefreshToken): Promise<RefreshToken | null> {
    const foundRefreshToken = await this.getByToken(refreshToken.token);

    if (foundRefreshToken) {
      return foundRefreshToken;
    }

    refreshTokens.push({
      ...refreshToken,
      revokedAt: refreshToken.revokedAt?.toString() ?? null,
      createdAt: refreshToken.createdAt.toString(),
      expiresAt: refreshToken.expiresAt.toString(),
    });
    return refreshToken;
  }

  async getByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = refreshTokens.find((rf) => rf.token === token);

    if (!refreshToken) {
      return null;
    }

    const parsedRefreshToken = {
      ...refreshToken,
      expiresAt: new Date(refreshToken.expiresAt),
      createdAt: new Date(refreshToken.createdAt),
      revokedAt: refreshToken.revokedAt
        ? new Date(refreshToken.revokedAt)
        : null,
    };

    return parsedRefreshToken;
  }
}

export const refreshTokensRepository = new JsonRefreshTokensRepository();
