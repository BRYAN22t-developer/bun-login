import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

export function createAuthRouter() {
  const router = Router();

  const controller = new AuthController();

  router.get("/google", controller.google);

  router.get("/callback/google", controller.googleCallback);

  router.post("/logout", controller.logout);

  router.post("/login", controller.login);

  router.post("/register", controller.register);

  router.post("/refresh", controller.refresh);

  router.get("/tokens", controller.getTokens);

  router.delete("/tokens/:token", controller.deleteToken);

  router.post("/tokens/:token/revoke", controller.revokeToken);

  router.post("/tokens/:token/activate", controller.activateToken);

  return router;
}
