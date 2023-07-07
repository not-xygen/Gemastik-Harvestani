import express from "express";
import cors from "cors";

import * as auth from "#/route/api/v1/auth.js";
import { injectUser } from "#/middleware/auth.js";
import parseCookie from "cookie-parser"

const app = express();

app.use(cors({}));
app.use(express.json());
app.use(injectUser);
app.use(parseCookie());

app.use("/api/v1/auth", auth.router());

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

app.route;
