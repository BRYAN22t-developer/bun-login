import { JsonAuthRepository } from "../repositories/json-auth";

const authRepository = new JsonAuthRepository();

export async function loginService(email: string, password: string) {
  const result = await authRepository.login(email, password);
  return result;
}
