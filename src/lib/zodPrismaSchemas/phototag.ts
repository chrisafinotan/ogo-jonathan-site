import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompletePhoto, RelatedPhotoModel } from "./index"

export const PhotoTagModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  description: z.string(),
})

export interface CompletePhotoTag extends z.infer<typeof PhotoTagModel> {
  photo: CompletePhoto[]
}

/**
 * RelatedPhotoTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPhotoTagModel: z.ZodSchema<CompletePhotoTag> = z.lazy(() => PhotoTagModel.extend({
  photo: RelatedPhotoModel.array(),
}))
