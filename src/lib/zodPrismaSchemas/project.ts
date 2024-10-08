import * as z from 'zod';
import {
    CompletePhoto,
    RelatedPhotoModel,
    CompleteTag,
    RelatedTagModel,
} from './index';

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
export const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
    z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
);

export const ProjectModel = z.object({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    title: z.string().min(3, { message: "Too short, 3 character minimum" }),
    description: z.string().min(3, { message: "Too short, 3 character minumum" }),
    isPublished: z.boolean(),
    projectDate: z.date(),
    displayOrder: z.number().int().nullish(),
    additionalInfo: jsonSchema.optional(),
    additionalInfoString: z.string().optional(),
    coverId: z.string().nullish(),
    photosOrder: z.string().array().optional(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
    photos: CompletePhoto[];
    tags: CompleteTag[];
    cover?: CompletePhoto | null;
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() =>
    ProjectModel.extend({
        photos: RelatedPhotoModel.array(),
        tags: RelatedTagModel.array(),
        cover: RelatedPhotoModel.nullish(),
    })
);
