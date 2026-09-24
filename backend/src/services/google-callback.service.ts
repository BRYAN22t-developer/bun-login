import { OAuth2Client } from "google-auth-library";
import { JsonAuthRepository } from "../repositories/json-auth";
import { addRefreshTokenService } from "./refresh-token.service";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5123/auth/callback/google",
);

const usersRepository = new JsonAuthRepository();

export async function googleCallbackService(code: string) {
  const { tokens } = await client.getToken(code);
  client.setCredentials(tokens);

  const idToken = tokens.id_token;

  if (!idToken || typeof idToken !== "string") {
    return { ok: false, error: "Invalid IdToken" };
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const email = payload?.email;

  if (!email) {
    return { ok: false, error: "Google account has no email" };
  }

  let userId = await usersRepository.create({
    username: "",
    email,
    provider: "Google",
  });

  if (!userId) {
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      return { ok: false, error: "User not found" };
    }

    userId = user.id;
  }

  const result = await addRefreshTokenService(userId);

  if (!result.ok) {
    return result;
  }

  return { ok: true, data: result.data.token };
}
