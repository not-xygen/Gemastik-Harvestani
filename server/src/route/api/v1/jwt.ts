import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RefreshToken, User } from "@prisma/client";
import prisma from "#/prisma.js";
import { randomUUID } from "crypto";

const { APP_SECRET } = process.env;

export async function authenticateUser(
  email: string,
  password: string
): Promise<User> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  return user;
}

export interface GeneratedRefreshToken {
  refreshTokenId: string;
  token: string;
}

export interface SignedRefreshToken {
  userId: string;
  refreshTokenId: string;
}

export async function authenticateRefreshToken(
  token: string
): Promise<RefreshToken | null> {
  let refreshToken = jwt.decode(token) as SignedRefreshToken | null;

  if (refreshToken == null) {
    return null;
  }

  let { refreshTokenId }: SignedRefreshToken = refreshToken;

  const model = await prisma.refreshToken.findUnique({
    where: {
      id: refreshTokenId,
    },
  });

  if (model?.hashed_token && (await bcrypt.compare(token, model?.hashed_token))) {
    return model;
  } else {
    return null;
  }
}

export async function createRefreshToken(
  user: User
): Promise<GeneratedRefreshToken> {
  const token = generateRefreshToken(user);

  await prisma.refreshToken.create({
    data: {
      id: token.refreshTokenId,
      hashed_token: await bcrypt.hash(token.token, await bcrypt.genSalt()),
      user_id: user.id,
    },
  });

  return token;
}

export function generateRefreshToken(user: User): GeneratedRefreshToken {
  const refreshTokenId = randomUUID();
  const token = jwt.sign({ refreshTokenId, userId: user.id }, APP_SECRET!, {
    expiresIn: "1w",
  });

  return {
    refreshTokenId,
    token,
  };
}

export function generateAccessToken(user: User): string {
  return jwt.sign({ userId: user.id }, APP_SECRET!);
}

export function decodeAccessToken(token: string): UserJWT | null {
  return jwt.decode(token) as UserJWT | null;
}

export interface UserJWT {
  userId: string;
}
