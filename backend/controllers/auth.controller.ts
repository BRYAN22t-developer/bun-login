import type { Request, Response } from "express";
import { googleCallbackService } from "../services/google-callback.service";
import { refreshTokenService } from "../services/refresh-token.service";

export class AuthController {
  async google(req: Request, res: Response) {
    const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=http://localhost:5123/auth/callback/google&response_type=code&scope=openid email profile`;

    res.redirect(URL);
  }

  async googleCallback(req: Request, res: Response) {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .redirect(`${process.env.FRONTEND_URL}/login?error=invalid_code`);
    }

    const result = await googleCallbackService(code);

    if (!result.ok) {
      console.log(result);
      return res
        .status(400)
        .redirect(`${process.env.FRONTEND_URL}/login?error=invalid_token`);
    }

    res.cookie("refresh_token", result.data, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect(`${process.env.FRONTEND_URL}/user`);
  }

  async refresh(req: Request, res: Response) {
    const token = req.cookies.refresh_token;

    if (!token) {
      return res.status(401).json({ error: "No Refresh token" });
    }

    const result = await refreshTokenService(token);

    if (!result.ok) {
      return res.json({ error: result.error.message });
    }

    res.cookie("refresh_token", result.data, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ access_token: result.data.accessToken });
  }
}
