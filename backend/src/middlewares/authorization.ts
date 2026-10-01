import type { NextFunction, Request, Response } from "express";

const permissions: Record<string, string[]> = {
  user: ["user:read"],
  admin: ["user:read", "user:delete", "user:update"],
};

export function authorization(requiredPermission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.payload?.role;

    if (!role) {
      return;
    }

    const permissionsRole = permissions[role];

    if (!permissionsRole) {
      return res.status(400).json({ error: "invalid role" });
    }

    if (!permissionsRole.includes(requiredPermission)) {
      return res.status(403).send();
    }

    next();
  };
}
