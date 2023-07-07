import typia from "typia";
import prisma from "#/prisma.js";
import bcrypt from "bcrypt";
import {
  authenticateRefreshToken,
  authenticateUser,
  createRefreshToken,
  generateAccessToken,
} from "./jwt.js";
import { Router } from "express";
import { Request, Response } from "express";

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
  res: Response<RegisterResponse | { error: string }>
) {
  let { email, password } = checkRegister((req as any).body);

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = generateAccessToken(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while signing up" });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = checkRegister(req.body);

  try {
    const user = await authenticateUser(email, password);

    const refreshToken = await createRefreshToken(user);

    const token = generateAccessToken(user);

    res.cookie("refresh-token", refreshToken.token);
    res.json({ token, refreshToken: refreshToken.token });
  } catch (error) {
    res.status(401).json({ error: "Invalid email or password" });
  }
}

export async function refreshToken(req: Request, res: Response) {
  const { refresh_token } = req.cookies;

  const r = await authenticateRefreshToken(refresh_token);

  let user = null;

  if (r) {
    user = await prisma.user.findUnique({
      where: { id: r.user_id },
    });
  }

  if (r && user) {
    res.json({ token: generateAccessToken(user) });
  } else {
    res.status(401).json({ error: "invalid refresh token" });
  }
}

export function router() {
  const router = Router();

  router.post("/register", register);
  router.post("/login", login);
  router.post("/refresh", refreshToken);

  return router;
}
