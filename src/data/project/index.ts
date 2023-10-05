import { prisma } from '@/services/prisma';

const DEFAULT_LIMIT = 20;

export const getAllProjects = async () => {
    return prisma.project.findMany();
};

export const getPublishedProjects = async (query = {}) => {
    const {
        limit = DEFAULT_LIMIT,
        order = { projectDate: 'desc' },
        offset,
        offsetId,
    } = query;
    return prisma.project.findMany({
        take: limit,
        orderBy: order,
        skip: offsetId && 1,
        cursor: offsetId && {
            id: offsetId,
        },
        where: {
            isPublished: true,
        },
        include: {
            photos: {
                select: {
                    id: true,
                    title: true,
                    url: true,
                    blurData: true,
                    extension: true,
                    takenAt: true,
                    priorityOrder: true,
                    tags: {
                        select: {
                            text: true,
                            description: true,
                        },
                    },
                },
            },
            tags: true,
            cover: true,
        },
    });
};


