import { refreshTokensRepository } from "../repositories/json-refresh-tokens";

export async function logoutService(token: string) {
  await refreshTokensRepository.delete(token);
}
