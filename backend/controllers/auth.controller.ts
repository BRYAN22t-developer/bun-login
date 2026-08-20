import type { Request, Response } from "express";
import { googleCallbackService } from "../services/google-callback.service";


export class AuthController {

  async googleCallback(req: Request, res: Response) {
    const { code } = req.query;

    if (!code || typeof code !== "string") {
      return res
        .status(400)
        .redirect(`${process.env.FRONTEND_URL}/login?error=invalid_code`);
    }

    const result = await googleCallbackService(code)

    if (!result.ok) {
        console.log(result)
        return res
          .status(400)
          .redirect(`${process.env.FRONTEND_URL}/login?error=invalid_token`);
      }

    res.cookie("authToken", result.data, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
      })

      return res.redirect(`${process.env.FRONTEND_URL}/user`);
  }
}
