'use server';

import _, { differenceBy } from 'lodash';
import { prisma } from '@/services/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

import {
    ProjectFormSchema,
    ProjectFormShape,
    ExistingProjectFormSchema,
    ExistingProjectFormShape,
    FinalProjectFormSchema,
    FinalProjectFormShape,
    ProjectPhotoSchema,
    ProjectPhotoShape,
    TagFormSchema,
    TagFormShape,
    ShowcaseUpdateArraySchema,
    ShowcaseUpdateArrayShape,
    ShowcaseAddPhotosArraySchema,
    ShowcaseAddPhotosArrayShape,
} from '@/lib/validation';
import { ProjectFormShape as ModifiedProjectFormShape } from '@/components/forms/helperSchemas';

const successResponse = (data: any) => {
    return { data };
};

const errorResponse = (message: string, e: unknown) => {
    return {
        error: {
            message,
        },
    };
};

export const createProjectAction = async (formData: ProjectFormShape) => {
    try {
        const data = ProjectFormSchema.parse(formData);
        const { photos } = data;
        const prismaData = {
            ...data,
            isPublished: false,
            photos: {
                create: photos,
            },
        };
        const res = await prisma.project.create({
            data: prismaData,
            include: {
                photos: true,
                cover: true,
            },
        });
        return successResponse(res);
    } catch (e) {
        return errorResponse('failed to create project', e);
    }
};

export const updateProjectAction = async (
    formData: ModifiedProjectFormShape,
    initialProjectData: ModifiedProjectFormShape
) => {
    const canPublish = FinalProjectFormSchema.safeParse(formData);
    console.log(canPublish, canPublish.error);

    try {
        console.log('update project', {
            photos: formData.photos,
            t: formData.tags,
            // project: _.omit(data, 'photos'),
        });
        const data = ProjectFormSchema.parse(formData);
        const { photos: initialPhotos, tags: initialTags } = initialProjectData;
        const { id, photos, coverId, tags } = data;
        const prismaData = {
            ...data,
            isPublished: false,
        };
        const include = { cover: true, photos: true, tags: true };

        if (photos) {
            prismaData.photos = {
                connect: photos.map((photo) => {
                    return { id: photo.id };
                }),
                disconnect: differenceBy(initialPhotos, photos, 'id').map(
                    (tag) => {
                        return { id: tag.id };
                    }
                ),
            };
        }

        if (tags) {
            prismaData.tags = {
                connect: tags.map((tag) => {
                    return { id: tag.id };
                }),
                disconnect: differenceBy(initialTags, tags, 'id').map((tag) => {
                    return { id: tag.id };
                }),
            };
        }

        if (coverId) {
            prismaData.cover = {
                connect: {
                    id: coverId,
                },
            };
        } else {
            prismaData.cover = {
                disconnect: true,
            };
        }
        delete prismaData.coverId;

        const updatedProject = await prisma.project.update({
            where: { id },
            data: prismaData,
            include: include,
        });
        console.log({ updatedProject });
        revalidatePath('/(admin)/admin/projects/[projectId]', 'page');
        return successResponse(updatedProject);
    } catch (e) {
        console.log('publish ', e);
        return errorResponse('failed to update project', e);
    }
};

export const publishProjectAction = async (formData: FinalProjectFormShape) => {
    console.log('trying to publish', formData);
    try {
        const data = FinalProjectFormSchema.parse(formData);
        const publishedProject = await prisma.project.update({
            where: { id: data.id },
            data: { isPublished: true },
        });
        console.log('pub ret server', publishedProject);
        revalidatePath('/(admin)/admin/projects/[projectId]', 'page');
        return successResponse(publishedProject);
    } catch (e) {
        console.log('publish ', e);
        return errorResponse('failed to publish project', e);
    }
};

export const createTagAction = async (formData: TagFormShape) => {
    try {
        const data = TagFormSchema.parse(formData);
        const newTag = await prisma.tag.create({
            data: data,
        });
        revalidatePath('/admin/tags');
        return successResponse(newTag);
    } catch (e) {
        return errorResponse('failed to create tag', e);
    }
};

export const updateTagAction = async (formData: TagFormShape) => {
    try {
        const data = TagFormSchema.parse(formData);
        const updatedTag = await prisma.tag.update({
            where: { id: data.id },
            data: data,
        });
        revalidatePath('/admin/tags');
        return successResponse(updatedTag);
    } catch (e) {
        return errorResponse('failed to update tag', e);
    }
};

export const createManyPhotosAction = async (formData: ProjectPhotoShape[]) => {
    try {
        const data = formData.map((photo) => ProjectPhotoSchema.parse(photo));
        if (data.length !== formData.length) return;
        const createPromises = data.map((photo) => {
            return prisma.photo.create({
                data: photo,
            });
        });
        const newPhotos = await Promise.all(createPromises);
        return successResponse(newPhotos);
    } catch (e) {
        return errorResponse('failed to create many photos', e);
    }
};

export const updateShowcaseAction = async (
    formData: ShowcaseUpdateArrayShape
) => {
    try {
        const data = ShowcaseUpdateArraySchema.parse(formData);
        const sqlDataClause = Prisma.join(
            data.map((row) => Prisma.sql`(${Prisma.join(row)})`)
        );
        const upsertQuery = Prisma.sql`
            INSERT INTO "Photo" ("id", "isShowcase", "showcaseOrder") 
            VALUES ${sqlDataClause} ON CONFLICT ("id") 
            DO UPDATE 
            SET 
                "id" = EXCLUDED."id",
                "isShowcase" = EXCLUDED."isShowcase",
                "showcaseOrder" = EXCLUDED."showcaseOrder"
        `;

        const result = await prisma.$executeRaw(upsertQuery);
        return successResponse(result);
    } catch (e) {
        return errorResponse('failed to update photos', e);
    }
};

export const addShowcasePhotosAction = async (
    formData: ShowcaseAddPhotosArrayShape
) => {
    try {
        let data = ShowcaseAddPhotosArraySchema.parse(formData);
        const result = await prisma.photo.updateMany({
            where: {
                id: { in: data as string[] },
            },
            data: {
                isShowcase: true,
            },
        });
        console.log({ data, result });
        return successResponse(result);
    } catch (e) {
        return errorResponse('failed to add photos', e);
    }
};
