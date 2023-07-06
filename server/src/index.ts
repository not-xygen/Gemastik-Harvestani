import express from "express";
import cors from "cors";

import * as auth from "./route/api/v1/auth";

const app = express();

app.use(cors({}));
app.use(express.json());

app.use("/api/v1/auth", auth.router());

const port = process.env.APP_PORT;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});

app.route;
