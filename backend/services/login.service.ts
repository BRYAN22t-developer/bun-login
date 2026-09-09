import { JsonUsersRepository } from "../repositories/json-users";

const authRepository = new JsonUsersRepository();

export async function loginService(email: string, password: string) {
  const result = await authRepository.login(email, password);
  return result;
}
