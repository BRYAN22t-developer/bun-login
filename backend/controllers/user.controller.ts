import type { Request, Response } from "express";
import { jsonUserRepository } from "../repositories/json-users";

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await jsonUserRepository.getAll();
    res.json(users);
  }
}
