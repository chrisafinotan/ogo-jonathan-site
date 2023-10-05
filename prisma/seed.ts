import { PrismaClient } from '@prisma/client';
import { projects } from './seed-data/projects';
import { tags } from './seed-data/tags';
import { TagType } from '@prisma/client';
import { z } from 'zod';
import { TagModel } from '@/lib/zodPrismaSchemas';
import { ProjectFormSchema, ProjectPhotoShape } from '@/lib/validation';
import { ListBlobResult } from '@vercel/blob';
import { randomUUID } from 'crypto';
type TagShape = z.infer<typeof TagModel>;
type ListBlobResultBlob = {
    url: string;
    pathname: string;
    size: number;
    uploadedAt: Date;
};
const tagTypes = Object.values(TagType);

const prisma = new PrismaClient();
const now = new Date();

const getPhotos = async (photoTags: TagShape[]) => {
    const res = await fetch('http://localhost:3000/api/blobs');
    const blobs: ListBlobResultBlob[] = await res.json();
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
            url: blob.url,
            blurData: blob.url,
            createdAt: blob.uploadedAt,
            priorityOrder: index,
            // tags: photoTags,
        };
    });
    return photos;
};

const createProjects = async (
    projectTags: TagShape[],
    createdPhotos: Omit<ProjectPhotoShape, 'tags'>[]
) => {
    let startIndex = 0;
    const photoCount = 2;
    const projectsData = projects.map((project, index) => {
        if (!createdPhotos[startIndex + photoCount]) startIndex = 0;
        const endIndex = startIndex + photoCount;
        const selectedPhotos = createdPhotos.slice(startIndex, endIndex);
        console.log({ selectedPhotos });
        startIndex = endIndex;
        return {
            ...project,
            // tags: projectTags,
            photos: {
                create: selectedPhotos
            },
        };
    });
    for (const project of projectsData) {
        // const parsed = ProjectFormSchema.parse(project);
        await prisma.project.create({
            data: project,
        });
    }

    const createdProjects = await prisma.project.findMany();
    console.log('projects', { createdProjects });
    return createdProjects;
};

const createTags = async () => {
    const tagsData = tags.map((tag) => {
        const { text } = tag;
        return {
            ...tag,
            type: tagTypes[Math.round(Math.random())],
            text: `${text}_${randomUUID()}`,
        };
    });
    await prisma.tag.createMany({
        data: tagsData,
    });
    const createdTags = await prisma.tag.findMany({});
    const projectTags = createdTags.filter(({ type }) => type === tagTypes[0]);
    const photoTags = createdTags.filter(({ type }) => type === tagTypes[1]);
    return [projectTags, photoTags];
};

async function main() {
    // Seed for photos
    const [projectTags, photoTags] = await createTags();
    const createdPhotos = await getPhotos(photoTags);
    const createdProjects = await createProjects(
        projectTags,
        createdPhotos as any
    );
}

main();
