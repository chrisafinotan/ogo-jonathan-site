import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteProject, RelatedProjectModel, CompletePhoto, RelatedPhotoModel } from "./index"

export const CoverModel = z.object({
  id: z.string(),
  projectId: z.string(),
  photoId: z.string(),
})

export interface CompleteCover extends z.infer<typeof CoverModel> {
  project: CompleteProject
  photo: CompletePhoto
}

/**
 * RelatedCoverModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCoverModel: z.ZodSchema<CompleteCover> = z.lazy(() => CoverModel.extend({
  project: RelatedProjectModel,
  photo: RelatedPhotoModel,
}))
