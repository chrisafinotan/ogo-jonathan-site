import { PrismaClient } from '@prisma/client';
import { projects } from './seed-data/projects.js';
import { tags } from './seed-data/tags.js';
import { TagType } from '@prisma/client';
import { getAllImages } from '../src/lib/firebase/storage.js';
import { createImages } from '../src/lib/firebase/seedHelper.js';

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
    items = items.filter((x, index) => itemIndex !== index);
    return item;
};

const createProjects = async (createdPhotos, projectTags) => {
    const projectsData = projects.map((project) => {
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
    for (const project of projectsData) {
        await prisma.project.create({
            data: project,
        });
    }

    const createdProjects = await prisma.project.findMany();
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
