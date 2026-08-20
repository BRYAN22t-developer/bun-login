export type User = {
  id: string;
  username: string;
};

export interface UsersRepository {
  login(username: string, password: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
