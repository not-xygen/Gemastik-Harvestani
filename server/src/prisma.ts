import prismaClient, { PrismaClient } from "@prisma/client";

(prismaClient as any).Decimal.prototype.toJSON = function () {
  return this.toNumber();
};

const prisma = new PrismaClient();

export default prisma;
