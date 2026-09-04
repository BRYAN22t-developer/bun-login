import { refreshTokensRepository } from "../repositories/json-refresh-tokens";

export async function revokeRefreshTokenService(token: string) {
  const result = await refreshTokensRepository.revoke(token);
  return result;
}
