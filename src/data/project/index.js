import { prisma } from '@/services/prisma';
import { orderPhotos } from '@/lib/utils';
const DEFAULT_LIMIT = 20;

export const getAllProjects = async () => {
    const projects = await prisma.project.findMany({
        include: INCLUDE_ALL,
    });
    const orderedProjects = projects.map(orderPhotos);
    return orderedProjects;
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
            ...INCLUDE_ALL,
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
        },
    });
};

export const getProjectById = async (projectId) => {
    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
        },
        include: INCLUDE_ALL,
    });
    return orderPhotos(project);
};

const projectSearchFields = ['title', 'description'];
const tagSearchFields = ['description', 'text'];
const searchTables = {
    project: { relation: null, fields: projectSearchFields },
    tag: { relation: 'tags', fields: tagSearchFields },
};
const INCLUDE_ALL = {
    photos: true,
    cover: true,
    tags: true,
};

const buildSearchQuery = (query, fieldName, relation) => {
    const contain = {
        contains: query,
        mode: 'insensitive',
    };

    if (relation) {
        return {
            [relation]: {
                some: {
                    [fieldName]: contain,
                },
            },
        };
    }
    return {
        [fieldName]: contain,
    };
};

const createSearchQuery = (query) => {
    const completeQuery = [
        // {
        //     additionalInfo: {
        //         path: '$.[*].name',
        //         string_contains: query,
        //     },
        // },
    ];
    for (const key in searchTables) {
        const { relation, fields } = searchTables[key];
        let tableQuery = {};
        fields.forEach((field) => {
            tableQuery = buildSearchQuery(query, field, relation);
            completeQuery.push(tableQuery);
        });
    }
    return completeQuery;
};

export const searchProjects = async (query) => {
    const prismaQuery = createSearchQuery(query);
    const results = await prisma.project.findMany({
        where: { OR: prismaQuery },
        include: INCLUDE_ALL,
    });
    console.log(results, prismaQuery, prismaQuery[2].tags);
    return results;
};
