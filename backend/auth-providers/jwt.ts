import type { AuthProvider } from "../types/auth-provider";
import type { AuthResult, AuthUser } from "../types/authResult";

export class JwtAuthProvider implements AuthProvider {
  authenticate(credentials: unknown): Promise<AuthResult> {
    throw new Error("Method not implemented.");
  }
  validate(token: string): Promise<AuthUser> {
    throw new Error("Method not implemented.");
  }

}
