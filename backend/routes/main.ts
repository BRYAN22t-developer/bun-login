import { Router } from "express";
import type { NextFunction, Request, Response } from "express";
import { createAuthRouter } from "./auth";
import { JsonAuthRepository } from "../repositories/json-auth";
import { authentication } from "../middlewares/bearer-authentication";

const usersResporitoy = new JsonAuthRepository();

export function createMainRouter() {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
  });

  router.get("/user", authentication, getUsers);

  router.get("/users/:email", async (req, res) => {
    const { email } = req.params;

    const user = await usersResporitoy.findByEmail(email);

    res.send(user);
  });

  router.use("/auth", createAuthRouter());

  return router;
}

function getUsers(req: Request, res: Response) {
  const authCookie = req.cookies.refresh_token;
  if (!authCookie) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  res.json({ cookies: req.cookies });
}
