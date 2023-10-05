import * as z from 'zod';
import {
    CompletePhoto,
    RelatedPhotoModel,
    CompleteCover,
    RelatedCoverModel,
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
    title: z.string(),
    description: z.string(),
    isPublished: z.boolean(),
    projectDate: z.date(),
    displayOrder: z.number().int().nullish(),
    additionalInfo: jsonSchema.optional(),
});

export interface CompleteProject extends z.infer<typeof ProjectModel> {
    photos: CompletePhoto[];
    cover?: CompleteCover | null;
    tags: CompleteTag[];
}

/**
 * RelatedProjectModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectModel: z.ZodSchema<CompleteProject> = z.lazy(() =>
    ProjectModel.extend({
        photos: RelatedPhotoModel.array(),
        cover: RelatedCoverModel.nullish(),
        tags: RelatedTagModel.array(),
    })
);
