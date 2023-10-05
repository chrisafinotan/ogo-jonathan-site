import { z } from 'zod';
import {
    ProjectModel,
    PhotoModel,
    RelatedPhotoModel,
    TagModel,
    jsonSchema,
} from './zodPrismaSchemas';

const defaultOmit = {
    id: true,
    createdAt: true,
    updatedAt: true,
};

export const ProjectPhotoSchema = PhotoModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    tags: z.string().array().optional(),
});

export const ProjectFormSchema = ProjectModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    isPublished: true,
}).extend({
    photos: ProjectPhotoSchema.array().optional(),
    files: z.any(),
    tags: z.string().array().optional(),
    cover: z.string().optional(),
});

export const TagFormSchema = TagModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export type ProjectPhotoShape = z.infer<typeof ProjectPhotoSchema>;
export type ProjectFormShape = z.infer<typeof ProjectFormSchema>;
export type TagFormShape = z.infer<typeof TagFormSchema>;
