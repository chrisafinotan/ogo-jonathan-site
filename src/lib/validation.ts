import { z } from 'zod';
import { ProjectModel, PhotoModel, TagModel } from './zodPrismaSchemas';

export const ProjectPhotoSchema = PhotoModel.omit({
    createdAt: true,
    updatedAt: true,
}).extend({
    id: z.string().optional(),
    tags: z.string().array().optional(),
});
export type ProjectPhotoShape = z.infer<typeof ProjectPhotoSchema>;

export const ProjectFormSchema = ProjectModel.omit({
    createdAt: true,
    updatedAt: true,
    isPublished: true,
}).extend({
    photos: ProjectPhotoSchema.array().optional(),
    tags: TagModel.array().optional(),
});
export type ProjectFormShape = z.infer<typeof ProjectFormSchema>;

export const ExistingProjectFormSchema = ProjectFormSchema.extend({
    id: z.string(),
    photos: ProjectPhotoSchema.array().optional(),
    cover: ProjectPhotoSchema.optional().nullish(),
    files: z.any(),
    tags: z.string().array().optional(),
});
export type ExistingProjectFormShape = z.infer<
    typeof ExistingProjectFormSchema
>;

export const FinalProjectFormSchema = ProjectModel.extend({
    id: z.string(),
    photos: PhotoModel.array().nonempty({message: "Needs photos",}),
    cover: PhotoModel,
    coverId: z.string(),
    tags: TagModel.array().optional(),
});
export type FinalProjectFormShape = z.infer<typeof FinalProjectFormSchema>;

export const TagFormSchema = TagModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).extend({
    id: z.string().optional(),
});
export type TagFormShape = z.infer<typeof TagFormSchema>;

export const allowedShowcase = z.union([
    z.string(),
    z.boolean(),
    z.number().optional().nullish(),
]);
export const ShowcaseUpdateSchema = allowedShowcase.array().min(3);
export type ShowcaseUpdateShape = z.infer<typeof ShowcaseUpdateSchema>;

export const ShowcaseUpdateArraySchema = ShowcaseUpdateSchema.array();
export type ShowcaseUpdateArrayShape = z.infer<
    typeof ShowcaseUpdateArraySchema
>;

export const ShowcaseAddPhotosArraySchema = z.string().optional().array();
export type ShowcaseAddPhotosArrayShape = z.infer<
    typeof ShowcaseAddPhotosArraySchema
>;
