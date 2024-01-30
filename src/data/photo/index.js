import { prisma } from '@/services/prisma';

const DEFAULT__PHOTOS_LIMIT = 50;

export const getShowcasePhotos = async (query = {}) => {
    const { limit = DEFAULT__PHOTOS_LIMIT, order = { takenAt: 'desc' } } =
        query;
    return prisma.photo.findMany({
        take: limit,
        orderBy: order,
        where: {
            isShowcase: true,
        },
        include: {
            Project: true,
        },
    });
};

export const addShowcasePhotos = async (photosIdList) => {
    return prisma.photo.updateMany({
        where: {
            id: { in: photosIdList },
        },
        data: {
            isShowcase: true,
        },
    });
};

export const getProjectUrl = (id) => {
    return `projects/${id}`;
};
