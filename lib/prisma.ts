// import prisma's database client
import { PrismaClient } from "@prisma/client";

// attach prisma to a global variable
const globalForPrisma = globalThis as unknown as{
    prisma: PrismaClient | undefined;
}

// create a prisma client if it doesn't exist
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if we're in development, attach the prisma client to the global variable
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;