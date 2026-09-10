import { JsonAuthRepository } from "../repositories/json-auth";

const authRepository = new JsonAuthRepository();

export async function registerService(email: string, password: string) {
  const result = await authRepository.register(email, password);
  return result;
}
