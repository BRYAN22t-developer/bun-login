import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export function createAuthRouter() {
  const router = Router();

  const controller = new AuthController();

  router.get("/callback/google", controller.googleCallback);

  router.post("/logout", (req, res) => {
    res.clearCookie("authToken").redirect(process.env.FRONTEND_URL!)
  })

  return router;
}
