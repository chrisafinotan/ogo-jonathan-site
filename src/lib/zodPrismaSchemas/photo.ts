import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteProject, RelatedProjectModel, CompleteCover, RelatedCoverModel, CompleteTag, RelatedTagModel } from "./index"

export const PhotoModel = z.object({
  id: z.string(),
  projectId: z.string().nullish(),
  isShowcase: z.boolean().nullish(),
  url: z.string(),
  extension: z.string(),
  blurData: z.string(),
  title: z.string().nullish(),
  locationName: z.string().nullish(),
  priorityOrder: z.number().int().nullish(),
  hidden: z.boolean().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  takenAt: z.date().nullish(),
})

export interface CompletePhoto extends z.infer<typeof PhotoModel> {
  Project?: CompleteProject | null
  isCover?: CompleteCover | null
  tags: CompleteTag[]
}

/**
 * RelatedPhotoModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPhotoModel: z.ZodSchema<CompletePhoto> = z.lazy(() => PhotoModel.extend({
  Project: RelatedProjectModel.nullish(),
  isCover: RelatedCoverModel.nullish(),
  tags: RelatedTagModel.array(),
}))
