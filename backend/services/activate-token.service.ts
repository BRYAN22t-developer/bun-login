import { refreshTokensRepository } from "../repositories/json-refresh-tokens";

export async function activateRefreshTokenService(token: string) {
  const result = await refreshTokensRepository.activate(token);
  return result;
}
