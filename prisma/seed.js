import { PrismaClient } from '@prisma/client';
import { projects } from './seed-data/projects.js';
import { tags } from './seed-data/tags.js';
import { TagType } from '@prisma/client';
import { getAllImages } from '../src/lib/firebase/storage.js';
import { createImages } from '../src/lib/firebase/seedHelper.js';
import { map } from 'lodash';

const tagTypes = Object.values(TagType);
const prisma = new PrismaClient();
const now = new Date();
const photoCount = 5;

const getPhotos = async () => {
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
            isShowcase: Math.random() > 0.25,
            url: blob,
            blurData: blob,
            createdAt: now,
            priorityOrder: index,
        };
    });
    return photos;
};

const getRandom = (items) => {
    const itemIndex = Math.floor(Math.random() * items.length);
    const item = items[itemIndex];
    return item;
};

const createProjects = async (createdPhotos, projectTags) => {
    const projectsData = map(projects, (project) => {
        let photos = createdPhotos;
        const selectedPhotos = Array(photoCount)
            .fill(null)
            .map(() => getRandom(photos));

        return {
            ...project,
            photos: { create: selectedPhotos },
            tags: { connect: projectTags },
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
};

const createTags = async () => {
    await prisma.tag.createMany({
        data: tags,
    });
    const createdTags = await prisma.tag.findMany({});
    const projectTags = createdTags.filter(({ type }) => type === tagTypes[0]);
    const photoTags = createdTags.filter(({ type }) => type === tagTypes[1]);
    return { projectTags, photoTags };
};

async function main() {
    const { photoTags, projectTags } = await createTags();
    const createdPhotos = await getPhotos(photoTags);
    const createdProjects = await createProjects(createdPhotos, projectTags);
    return createdProjects;
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
