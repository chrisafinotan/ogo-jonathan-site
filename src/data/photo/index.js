import { prisma } from '@/services/prisma';
import { parseProject } from '@/data/project';

const DEFAULT__PHOTOS_LIMIT = 50;

function getProjectUrl(id) {
    return `projects/${id}`;
}

export const getShowcasePhotos = async (query = {}) => {
    const { limit = DEFAULT__PHOTOS_LIMIT, order = { takenAt: 'desc' } } =
        query;
    const showcasePhotos = await prisma.photo.findMany({
        take: limit,
        orderBy: order,
        where: {
            isShowcase: true,
            deletedDate: null,
        },
        include: {
            Project: {
                where: {
                    deletedDate: null,
                },
            },
        },
    });
    return showcasePhotos.map((photo) => {
        photo.projectUrl = getProjectUrl(photo.projectId);
        photo.Project = parseProject(photo.Project);
        return photo;
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
