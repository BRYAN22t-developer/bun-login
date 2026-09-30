import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authorization } from "../middlewares/authorization";
import { authentication } from "../middlewares/bearer-authentication";

export function createUserRouter() {
  const router = Router();

  const controller = new UserController();

  router.get(
    "/",
    authentication,
    authorization("user:read"),
    controller.getAll,
  );

  router.delete(
    "/:id",
    authentication,
    authorization("user:delete"),
    controller.delete,
  );

  router.patch(
    "/:id",
    authentication,
    authorization("user:update"),
    controller.update,
  );

  return router;
}
