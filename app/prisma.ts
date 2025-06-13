import { PrismaClient } from "@prisma/client"
 // This code prevents the Prisma Client from being instantiated multiple times
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
 
export const prisma = globalForPrisma.prisma || new PrismaClient()
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma