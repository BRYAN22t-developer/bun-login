import type { User, UserRepository } from "../types/repositories";
import users from "./db/users.json";

export class JsonUserRepository implements UserRepository {
  async getAll(): Promise<Omit<User, "password">[] | null> {
    const parsedUsers = users.map((user) => {
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        provider: user.provider,
      };
    });
    return parsedUsers;
  }
}

export const jsonUserRepository = new JsonUserRepository();
