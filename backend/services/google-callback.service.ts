import { OAuth2Client } from "google-auth-library";
import { JsonUsersRepository } from "../repositories/json-users";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:5123/auth/callback/google",
);

const usersRepository = new JsonUsersRepository();

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

  if (!(await usersRepository.findByEmail(payload?.email as string))) {
    const user = usersRepository.create({
      username: "",
      email: payload?.email as string,
      provider: "Google",
    });
  }

  return { ok: true, data: payload };
}
