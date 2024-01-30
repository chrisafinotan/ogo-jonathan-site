import { prisma } from '@/services/prisma';

const DEFAULT_LIMIT = 20;

export const getAllTags = () => prisma.tag.findMany({});
