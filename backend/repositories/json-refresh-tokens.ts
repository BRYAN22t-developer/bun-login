import type {
  RefreshToken,
  RefreshTokensRepository,
} from "../types/repositories";
import refreshTokens from "./db/tokens.json";

export class JsonRefreshTokensRepository implements RefreshTokensRepository {
  async delete(token: string): Promise<null> {
    const refreshToken = refreshTokens.find((rf) => rf.token === token);

    if (!refreshToken) {
      return null;
    }

    const index = refreshTokens.indexOf(refreshToken);

    refreshTokens.toSpliced(index, 1);

    return null;
  }

  async getAll(): Promise<RefreshToken[] | null> {
    const parsedRefreshTokens = refreshTokens.map((rf) => {
      return {
        ...rf,
        expiresAt: new Date(rf.expiresAt),
        createdAt: new Date(rf.createdAt),
        revokedAt: rf.revokedAt ? new Date(rf.revokedAt) : null,
      };
    });
    return parsedRefreshTokens;
  }

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

  async reemplace(
    oldToken: string,
    newRefreshToken: RefreshToken,
  ): Promise<RefreshToken | null> {
    const oldRefreshToken = refreshTokens.find((r) => r.token === oldToken);

    if (!oldRefreshToken) {
      throw new Error("Old token does not exist");
    }

    const index = refreshTokens.indexOf(oldRefreshToken);

    refreshTokens.splice(index, 1);

    const result = await this.add(newRefreshToken);

    return result;
  }
}

export const refreshTokensRepository = new JsonRefreshTokensRepository();
