import type { Request, Response } from "express";
import { userService } from "../services/user.service";

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await userService.getAll();
    res.json(users);
  }
}
