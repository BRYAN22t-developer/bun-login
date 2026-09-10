import { JsonAuthRepository } from "../repositories/json-auth";
import type { Result } from "../types/result";
import { addRefreshTokenService } from "./refresh-token.service";

const authRepository = new JsonAuthRepository();

export async function loginService(
  email: string,
  password: string,
): Promise<Result<string, Error>> {
  const result = await authRepository.login(email, password);

  if (!result) {
    return { ok: false, error: new Error("no user found") };
  }

  const tokenResult = await addRefreshTokenService(result.id);

  if (!tokenResult.ok) {
    return { ok: false, error: new Error("token repository error") };
  }

  return { ok: true, data: tokenResult.data.token };
}
