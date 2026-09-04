import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export function createAuthRouter() {
  const router = Router();

  const controller = new AuthController();

  router.get("/google", controller.google);

  router.get("/callback/google", controller.googleCallback);

  router.post("/logout", controller.logout);

  router.post("/refresh", controller.refresh);

  router.get("/tokens", controller.getTokens);

  router.delete("/tokens/:token", controller.deleteToken);

  return router;
}
