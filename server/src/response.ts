import { Response } from "express-serve-static-core";

export function unauthorizedResponse(res: Response) {
  res.status(401).json({ error: "login needed to access this resource" });
}

