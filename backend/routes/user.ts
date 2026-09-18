import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export function createUserRouter() {
  const router = Router();

  const controller = new UserController();

  router.get("/", controller.getAll);

  router.delete("/:id", controller.delete);

  router.patch("/:id", controller.update);

  return router;
}
