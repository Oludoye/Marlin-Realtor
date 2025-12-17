import { PrismaClient } from "@prisma/client";

// Prevent multiple instances of Prisma Client in development
// Otherwise, hot reloads will create multiple clients causing errors
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // optional: logs all SQL queries to console
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
