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

  async delete(id: string): Promise<null> {
    const user = users.find((user) => user.id === id);

    console.log(user);

    if (!user) {
      return null;
    }

    const index = users.indexOf(user);

    users.splice(index, 1);
    return null;
  }
}

export const jsonUserRepository = new JsonUserRepository();
