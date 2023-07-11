import express from "express";
import cors from "cors";

import * as auth from "#/route/api/v1/auth.js";
import * as lahan from "#/route/api/v1/lahan.js";
import * as tanam from "#/route/api/v1/tanam.js";
import * as bibit from "#/route/api/v1/bibit.js";
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
app.use("/api/v1/tanam", tanam.router());
app.use("/api/v1/bibit",bibit.router())
app.use(express.static("public", {}));

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof TypeGuardError) {
    res.status(422).json({ error: error.message });
  } else {
    console.log(error);
    next();
  }
});


const port = process.env.APP_PORT;
app.listen(3000, () => {
  console.log(`server started at ${3000}`);
});

app.route;
