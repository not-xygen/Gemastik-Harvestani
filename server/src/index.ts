import express from "express";
import cors from "cors";

import * as auth from "#/route/api/v1/auth.js";
import * as lahan from "#/route/api/v1/lahan.js";
import { injectUser } from "#/middleware/auth.js";
import parseCookie from "cookie-parser";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { TypeGuardError } from "typia";

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(injectUser);
app.use(parseCookie());

app.use("/api/v1/auth", auth.router());
app.use("/api/v1/lahan", lahan.router());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof TypeGuardError) {
    res.status(422).json({ error: error.message });
  } else {
    console.log(error);
    next();
  }
});

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

app.route;
