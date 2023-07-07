import { UserJWT, decodeAccessToken } from "#/route/api/v1/jwt";
import { Request, Response } from "express-serve-static-core";

export function injectUser(req: Request, res: Response, next: any) {
  const { authorization } = req.headers;

  if (authorization) {
    req.user = decodeAccessToken(authorization);
  }

  next();
}

declare module "express-serve-static-core" {
  interface Request {
    user: UserJWT | null;
  }
}
