import { Response } from "express-serve-static-core";

export function unauthorizedResponse(res: Response) {
  res.status(401).json({ error: "login needed to access this resource" });
}

export function forbiddenResponse(res: Response) {
  res.status(403).json({ error: "you cannot access this resource" });
}

export function notFoundResponse(res: Response) {
  res.status(404).json({ error: "this resource doesn't exists" });
}
