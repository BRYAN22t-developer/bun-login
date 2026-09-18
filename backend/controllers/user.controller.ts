import type { Request, Response } from "express";
import { jsonUserRepository } from "../repositories/json-users";

export class UserController {
  async getAll(req: Request, res: Response) {
    const users = await jsonUserRepository.getAll();
    res.json(users);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "no id sent" });
    }

    await jsonUserRepository.delete(id);

    res.status(204).send();
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "id is required" });
    }

    const { username, email, provider } = req.body;

    const updatedUser = await jsonUserRepository.update(id, {
      username,
      email,
      provider,
    });

    if (!updatedUser) {
      return res.status(404).send();
    }

    res.json(updatedUser);
  }
}
