import { jsonUserRepository } from "../repositories/json-users";

export class UserService {
  async getAll() {
    const users = await jsonUserRepository.getAll();
    return users;
  }
}

export const userService = new UserService();
