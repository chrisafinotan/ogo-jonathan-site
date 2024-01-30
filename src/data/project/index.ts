import { prisma } from '@/services/prisma';
import { orderPhotos } from '@/lib/utils';
const DEFAULT_LIMIT = 20;

const projectSearchFields = ['title', 'description'];
const tagSearchFields = ['description', 'text'];
const heirarchy = {
    project: { relation: null, fields: projectSearchFields },
    tag: { relation: 'tags', fields: tagSearchFields },
};

const INCLUDE_ALL = {
    photos: true,
    cover: true,
    tags: true,
};

const buildSearchQuery = (query, obj, fieldName, relation) => {
    let objLevel = obj;
    const contain = {
        contains: query,
        mode: 'insensitive',
    };
    let fieldObj = {
        [fieldName]: contain,
    };
    if (relation) {
        obj[relation] = obj[relation] || {
            some: {},
        };
        obj[relation].some[fieldName] = contain;
        return obj;
        // objLevel = obj[relation];
    }
    // objLevel[fieldName] = {
    //     contains: query,
    //     mode: 'insensitive',
    // };
    return fieldObj;
};

const createSearchQuery = (query) => {
    const completeQuery = [];
    for (const key in heirarchy) {
        const { relation, fields } = heirarchy[key];
        let tableQuery = {};
        fields.forEach((field) => {
            tableQuery = buildSearchQuery(query, tableQuery, field, relation);
            completeQuery.push(tableQuery);
        });
    }
    return completeQuery;
};

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

export const searchProjects = async (query) => {
    const prismaQuery = createSearchQuery('photo');
    console.log(prismaQuery);
    try {
        const results = await prisma.project.findMany({
            where: {
                OR: prismaQuery,
            },
            include: {
                photos: true,
                cover: true,
                tags: true,
            },
        });
        console.log('many', results.length);
        return results;
    } catch (e) {
        console.log('many err', e);
    }
};
