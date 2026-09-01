export type User = {
  id: string;
  username: string;
};

export interface UsersRepository {
  login(username: string, password: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}

export type RefreshToken = {
  id: string,
  userId: string,
  token: string,
  expiresAt: Date,
  revokedAt: Date | null,
  createdAt: Date
}

export interface RefreshTokensRepository {
  add(refreshToken: RefreshToken): Promise<RefreshToken | null>
  getByToken(token: string): Promise<RefreshToken | null>
}
