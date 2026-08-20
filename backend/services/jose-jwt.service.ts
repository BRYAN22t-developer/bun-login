import { SignJWT, jwtVerify } from "jose";

export class JoseJwtService {
  private readonly secret = new TextEncoder().encode(process.env.JWT_SECRET);
  async sign(payload: unknown) {
    const jwt = await new SignJWT({ payload })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(this.secret);

    return jwt;
  }

  async verify(jwt: string) {
    const data = await jwtVerify(jwt, this.secret);

    return data;
  }
}
