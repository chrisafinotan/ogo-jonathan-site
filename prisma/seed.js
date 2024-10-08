import { PrismaClient } from '@prisma/client';
import { projects } from './seed-data/projects.js';
import { tags } from './seed-data/tags.js';
import { TagType } from '@prisma/client';
import {
    getAllImages,
    getAllImagesByFolders,
} from '../src/lib/firebase/storage.js';
import { createImages } from '../src/lib/firebase/seedHelper.js';
import { assign, find, groupBy, map } from 'lodash';

const tagTypes = Object.values(TagType);
const prisma = new PrismaClient();
const now = new Date();
const photoCount = 5;

// dev code
async function getPhotos() {
    let blobs = await getAllImages();
    if (blobs.length < photoCount) blobs = await createImages();
    else console.log(`Found ${blobs.length} photos`);
    if (blobs.length === 0) throw new Error('no images found');

    const photoDefault = {
        isShowcase: false,
        title: 'sample photo record',
        extension: 'jpg',
        locationName: 'ottawa',
        hidden: false,
        takenAt: now,
    };

    const photos = blobs.map((blob, index) => {
        return {
            ...photoDefault,
            isShowcase: index % 3 === 0,
            url: blob,
            blurData: blob,
            createdAt: now,
            priorityOrder: index,
        };
    });
    return photos;
}

function getRandom(items) {
    const itemIndex = Math.floor(Math.random() * items.length);
    const item = items[itemIndex];
    return item;
}

async function createProjects(createdPhotos, projectTags) {
    const projectsData = map(projects, (project) => {
        let photos = createdPhotos;
        let additionalInfoString;
        if (project.additionalInfo) {
            additionalInfoString = JSON.stringify(project.additionalInfo)
        }
        const selectedPhotos = Array(photoCount)
            .fill(null)
            .map(() => getRandom(photos));
        const selectedTags = Array(2)
            .fill(null)
            .map(() => getRandom(projectTags));
        return {
            ...project,
            additionalInfoString,
            photos: { create: selectedPhotos },
            tags: { connect: selectedTags },
        };
    });
    const include = { cover: true, photos: true, tags: true };
    const createdProjects = [];

    for (const project of projectsData) {
        delete project.cover;
        delete project.files;
        delete project.Category;
        delete project.Tag;
        let createdProject = await prisma.project.create({
            data: project,
            include: include,
        });
        const updateData = {
            cover: {
                connect: {
                    id: getRandom(createdProject.photos).id,
                },
            },
        };
        const updatedProject = await prisma.project.update({
            where: { id: createdProject.id },
            data: updateData,
            include: include,
        });
        createdProjects.push(updatedProject);
    }
    console.log(`Created ${createdProjects.length} projects`);
    return createdProjects;
}

async function createTags() {
    await prisma.tag.createMany({
        data: tags,
    });
    const createdTags = await prisma.tag.findMany({});
    const projectTags = createdTags.filter(({ type }) => type === tagTypes[0]);
    const photoTags = createdTags.filter(({ type }) => type === tagTypes[1]);
    return { projectTags, photoTags };
}

// production code
async function getLivePhotos(projects) {
    const imagesWithProjectName = await getAllImagesByFolders(projects);
    if (imagesWithProjectName.length === 0)
        throw new Error('no folder/images found');

    const photoDefault = {
        isShowcase: false,
        extension: 'jpg',
        hidden: false,
        takenAt: now,
    };

    const photosWithProjectName = imagesWithProjectName.map((mapping) => {
        const { imageObjects, folderName } = mapping;
        let cover = null;
        const prismaPhotoObjects = imageObjects.map(
            ({ url, metaData, isCover }, imageIndex) => {
                const returnObj = {
                    ...photoDefault,
                    title: `Photo ${imageIndex + 1} for ${folderName}`,
                    url,
                    blurData: url,
                    createdAt: now,
                    priorityOrder: imageIndex,
                };
                if (isCover) cover = returnObj;
                return returnObj;
            }
        );
        return { prismaPhotoObjects, cover, ...mapping };
    });
    return photosWithProjectName;
}

async function createLiveProjects(photosGroupedByProjectName) {
    const coversByProjectName = {};
    let additionalInfoString;
    const projectsData = map(projects, (project) => {
        if (project.additionalInfo) {
            additionalInfoString = JSON.stringify(project.additionalInfo)
        }
        const matchingProject = photosGroupedByProjectName[project.files];
        if (!matchingProject) {
            console.log(
                `cannot find match for project: ${project.title}, File: ${project.files} does not exist`
            );
            return;
        }
        const projectPhotos = matchingProject[0].prismaPhotoObjects;
        if (matchingProject[0].cover)
            coversByProjectName[project.files] = matchingProject[0].cover;
        if (projectPhotos.length === 0) return project;
        return {
            ...project,
            isPublished: true,
            additionalInfoString,
            photos: { create: projectPhotos },
        };
    });
    const include = { cover: true, photos: true, tags: true };
    const createdProjects = [];

    function getCoverId(createdProject, projectData) {
        if (!createdProject.photos) return null;
        const { files } = projectData;
        const coverObj = coversByProjectName[files];
        if (!coverObj) return;
        const coverPhoto = find(createdProject.photos, { url: coverObj.url });
        if (coverPhoto) return coverPhoto.id;
    }

    for (const ogProject of projectsData) {
        const project = assign({}, ogProject);
        delete project.cover;
        delete project.files;
        delete project.Category;
        delete project.Tag;
        let createdProject = await prisma.project.create({
            data: project,
            include: include,
        });
        const coverId = getCoverId(createdProject, ogProject);
        if (coverId) {
            const updateData = {
                cover: {
                    connect: {
                        id: coverId,
                    },
                },
            };
            const updatedProject = await prisma.project.update({
                where: { id: createdProject.id },
                data: updateData,
                include: include,
            });
            createdProjects.push(updatedProject);
        } else {
            createdProjects.push(createdProject);
        }
    }
    console.log(`Created ${createdProjects.length} projects`);
}

function getFolderPhotos() {
    const folderPhotos = [
        '/testImage3.webp',
        '/testImage4.webp',
        '/testImageA.webp',
        '/testImageB.webp',
        '/testImageC.webp',
        '/testImageD.webp',
        '/testImageE.webp',
    ];
    return folderPhotos.map((url, index) => {
        return {
            isShowcase: (Math.random() > 0.75),
            title: 'sample photo record',
            extension: 'jpg',
            locationName: 'ottawa',
            hidden: false,
            takenAt: new Date('07/01/2021'),
            url,
            blurData: url,
            createdAt: new Date('07/01/2021'),
            priorityOrder: index,
        };
    });
}

async function main() {
    const seedMode = process.env.NODE_ENV;
    const useStoragePhotos = process.env.STORAGE_PHOTOS === 'true' || false;
    console.log('----- MODE:', seedMode);
    console.log('----- USING STORAGE:', useStoragePhotos);
    if (seedMode === 'production') {
        const photosWithProjectName = await getLivePhotos(projects);
        const photosGroupedByProjectName = groupBy(
            photosWithProjectName,
            'folderName'
        );
        const createdProjects = await createLiveProjects(
            photosGroupedByProjectName
        );
        return createdProjects;
    }
    if (seedMode === 'development') {
        const { photoTags, projectTags } = await createTags();
        
        let createdPhotos = useStoragePhotos
        ? await getPhotos(photoTags)
        : getFolderPhotos();
        const createdProjects = await createProjects(
            createdPhotos,
            projectTags
        );
        console.log({ createdProjects });
        return createdProjects;
    }
    throw new Error('unsupported mode', seedMode);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
