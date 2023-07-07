import { UserJWT, decodeAccessToken } from "#/route/api/v1/jwt.js";
import { Request, Response, NextFunction } from "express-serve-static-core";

export function injectUser(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (authorization?.startsWith("Bearer ")) {
    req.user = decodeAccessToken(authorization.replace("Bearer ", ""));
  }

  next();
}

declare module "express-serve-static-core" {
  interface Request {
    user: UserJWT | null;
  }
}
