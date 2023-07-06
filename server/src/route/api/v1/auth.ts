import typia from "typia";
import prisma from "#/prisma";
import bcrypt from "bcrypt";
import { authenticateUser, generateToken } from "./jwt";
import { Router } from "express";
import { Response } from "express-serve-static-core";

interface RegisterRequest {
  /**
   * Email address
   *
   * @format email
   */
  email: string;

  /**
   * Password
   *
   * @minLength 8
   */
  password: string;
}

interface RegisterResponse {
  token: string;
}

const checkRegister = typia.createAssert<RegisterRequest>();

export async function register(
  req: Request,
  res: Response
  // res: Response<RegisterResponse | { error: string }>,
) {
  let { email, password } = checkRegister((req as any).body);

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing up" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = checkRegister(req.body);

  try {
    const user = await authenticateUser(email, password);

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
}

export function router() {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);

  return router;
}
