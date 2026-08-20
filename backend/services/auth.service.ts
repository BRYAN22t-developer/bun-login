import type { AuthProvider } from "../types/auth-provider";

export class AuthService {
  constructor(private readonly provider: AuthProvider) {}

  async authenticate(credentials: unknown) {
    return this.provider.authenticate(credentials);
  }

  async validate(token: string) {
    this.provider.validate(token);
  }
}
