import type { AuthResult, AuthUser } from "./authResult";

export interface AuthProvider {
  authenticate(credentials: unknown): Promise<AuthResult>;
  validate(token: string): Promise<AuthUser>;
}
