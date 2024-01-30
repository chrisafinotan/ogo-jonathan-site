import { z } from 'zod';
import {
    ProjectFormSchema as initProjectFormSchema,
    ProjectPhotoSchema,
    ShowcaseUpdateArrayShape,
} from '@/lib/validation';
import { jsonSchema } from '@/lib/zodPrismaSchemas';
import { FullMetadata } from 'firebase/storage';

const ProjectFormSchema = initProjectFormSchema.extend({
    coverURL: z.string().optional(),
    photosPreview: z.instanceof(File).array().optional(),
    additionalInfoFields: z
        .object({
            key: z.string(),
            value: z.string(),
        })
        .array()
        .optional(),
});
const ShowcaseFormSchema = z.object({
    initShowcase: ProjectPhotoSchema.array(),
    finalShowcase: ProjectPhotoSchema.array(),
});

type ProjectFormShape = z.infer<typeof ProjectFormSchema>;
type ShowcaseFormShape = z.infer<typeof ShowcaseFormSchema>;
type AdditionalInfoShape = z.infer<typeof jsonSchema>
type UploadResultShape = {
    url: string;
    metadata: FullMetadata;
}[];

export { ProjectFormSchema, ShowcaseFormSchema };
export type { ProjectFormShape, ShowcaseFormShape, ShowcaseUpdateArrayShape, AdditionalInfoShape, UploadResultShape };
