import { PrismaClient } from "@prisma/client";
import { globalObj } from "@/services/globalThis";
export type * from "@prisma/client";

export const prisma = globalObj.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalObj.prisma = prisma;

