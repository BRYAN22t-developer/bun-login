import { SignJWT, jwtVerify } from "jose";

type SignOptions = {
  expirationTime: string,
}

export class JoseJwtService {
  private readonly secret = new TextEncoder().encode(process.env.JWT_SECRET);
  async sign(payload: Record<string, unknown>, options?: SignOptions) {
    const jwt = await new SignJWT( payload )
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(options?.expirationTime ?? "2h")
      .sign(this.secret);

    return jwt;
  }

  async verify(jwt: string) {
    const data = await jwtVerify(jwt, this.secret);

    return data.payload;
  }
}

export const joseJwtService = new JoseJwtService()
