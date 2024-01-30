import { Logger } from 'winston';
import { PrismaClient } from '@prisma/client';

export const globalObj = globalThis as unknown as {
    logger: Logger | undefined;
    prisma: PrismaClient | undefined;
};
