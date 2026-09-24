import type { Request, Response } from "express";
import { googleCallbackService } from "../services/google-callback.service";
import {
  deleteRefreshTokenService,
  getRefreshTokenService,
} from "../services/refresh-token.service";
import { refreshTokensRepository } from "../repositories/json-refresh-tokens";
import { logoutService } from "../services/logout.service";
import { revokeRefreshTokenService } from "../services/revoke-token.service";
import { activateRefreshTokenService } from "../services/activate-token.service";
import { loginService } from "../services/login.service";
import { registerService } from "../services/register.service";

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

    const result = await getRefreshTokenService(token);

    if (!result.ok) {
      return res.json({ error: result.error.message });
    }

    res.cookie("refresh_token", result.data.refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ access_token: result.data.accessToken });
  }

  async getTokens(req: Request, res: Response) {
    const refreshTokens = await refreshTokensRepository.getAll();
    res.json(refreshTokens);
  }

  async logout(req: Request, res: Response) {
    const token = req.cookies["refresh_token"];

    if (!token) {
      return res.json("ok");
    }

    logoutService(token);

    res.clearCookie("refresh_token", {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json("ok");
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "not email or password" });
    }

    const result = await loginService(email, password);

    if (!result.ok) {
      return res.status(404).json({ error: "not found" });
    }

    res.cookie("refresh_token", result.data, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json("ok");
  }

  async deleteToken(req: Request, res: Response) {
    const { token } = req.params;

    if (!token) {
      return res.status(204).json({ alert: "No token found" });
    }

    const tokenString = Array.isArray(token) ? token[0] : token;

    const result = await deleteRefreshTokenService(tokenString as string);

    res.json("ok");
  }

  async revokeToken(req: Request, res: Response) {
    const { token } = req.params;

    if (!token) {
      return res.status(204).json({ alert: "No token found" });
    }

    const tokenString = Array.isArray(token) ? token[0] : token;

    const result = await revokeRefreshTokenService(tokenString as string);

    if (!result) {
      res.status(204).json(result);
    }

    res.json("ok");
  }

  async activateToken(req: Request, res: Response) {
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ error: "No token recieved" });
      return;
    }

    const tokenString = Array.isArray(token) ? token[0] : token;

    const result = await activateRefreshTokenService(tokenString as string);

    if (!result) {
      res.status(204).json("ok");
      return;
    }

    res.json("ok");
  }

  async register(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "not email nor password found",
      });
      return;
    }

    const result = await registerService(email, password);

    if (!result) {
      return res.status(400).json({ error: "something went wrong" });
    }

    res.json({ id: result.id, email: result.email });
  }
}
