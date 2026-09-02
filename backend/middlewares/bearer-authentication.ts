import type { NextFunction, Request, Response } from "express";
import { joseJwtService } from "../services/jose-jwt.service";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing access token" });
    return;
  }

  try {
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const payload = await joseJwtService.verify(token);

    if (typeof payload.id !== "string" || typeof payload.email !== "string") {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    req.payload = {
      id: payload.id,
      email: payload.email,
    };

    next();
  } catch (e) {
    res.status(401).json({ error: "Invalid auth token" });
  }
}
