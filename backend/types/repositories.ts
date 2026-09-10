export type User = {
  id: string;
  email: string;
  username: string;
  password?: string;
  provider?: string;
};

export interface AuthRepository {
  login(username: string, password: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  register(email: string, password: string): Promise<User | null>;
}

export type RefreshToken = {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
};

export interface RefreshTokensRepository {
  getAll(): Promise<RefreshToken[] | null>;
  add(refreshToken: RefreshToken): Promise<RefreshToken | null>;
  getByToken(token: string): Promise<RefreshToken | null>;
  reemplace(
    oldToken: string,
    newRefreshToken: RefreshToken,
  ): Promise<RefreshToken | null>;
  delete(token: string): Promise<null>;
  revoke(token: string): Promise<RefreshToken | null>;
  activate(token: string): Promise<RefreshToken | null>;
}
