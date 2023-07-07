import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@prisma/client";
import { GetResult } from "@prisma/client/runtime";
import prisma from "#/prisma";

const { APP_SECRET } = process.env;

function generateToken(user: User): string {
  return jwt.sign({ userId: user.id }, APP_SECRET!);
}

async function authenticateUser(
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

function decodeToken(token: string): { userId: string } | null {
  return jwt.decode(token) as { userId: string } | null
}

export { generateToken, authenticateUser };
