import type { NextFunction, Request, Response } from "express";
import { joseJwtService } from "../services/jose-jwt.service";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.cookies.authToken;

  if (!authToken) {
    res.status(401).json({ error: "Missing auth token" });
    return;
  }

  try {
    const payload = await joseJwtService.verify(authToken);

    if (typeof payload.id !== "string" || typeof payload.email !== "string") {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    req.payload = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch(e) {
    res.status(401).json({ error: "Invalid auth token" });
  }
}
