import type { AuthRepository, User } from "../types/repositories";
import users from "./db/users.json";

export class JsonAuthRepository implements AuthRepository {
  async register(email: string, password: string): Promise<User | null> {
    const currentUser = await this.findByEmail(email);

    if (currentUser !== null) {
      return currentUser;
    }

    const lastUser = users[users.length - 1];

    let id = 0;
    if (!lastUser) {
      id = 1;
    } else {
      id = parseInt(lastUser.id) + 1;
    }

    users.push({
      email,
      password,
      username: "",
      id: id.toString(),
    });

    const user = await this.findByEmail(email);

    return user;
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = users.find((user) => user.email === email);

    if (user?.password !== password) {
      return null;
    }

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = users.find((user) => (user.id = id));

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase(),
    );

    if (!user) {
      return null;
    }

    return user;
  }

  async create(user: Omit<User, "id">) {
    const foundUser = await this.findByEmail(user.email);
    if (foundUser) {
      return null;
    }

    const id = (parseInt(users.at(-1)?.id as string) + 1).toString();

    if (user.provider) {
      users.push({
        id,
        username: user.username,
        email: user.email,
        provider: user.provider,
      });
      return id;
    }

    if (user.password) {
      users.push({
        id,
        username: user.username,
        email: user.email,
        password: user.password,
      });
    }

    return id;
  }
}
