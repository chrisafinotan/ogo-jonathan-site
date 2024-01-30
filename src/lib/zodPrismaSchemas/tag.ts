import * as z from "zod"
import { TagType } from "@prisma/client"
import { CompletePhoto, RelatedPhotoModel, CompleteProject, RelatedProjectModel } from "./index"

export const TagModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  description: z.string(),
  color: z.string(),
  type: z.nativeEnum(TagType),
})

export interface CompleteTag extends z.infer<typeof TagModel> {
  photo: CompletePhoto[]
  project: CompleteProject[]
}

/**
 * RelatedTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedTagModel: z.ZodSchema<CompleteTag> = z.lazy(() => TagModel.extend({
  photo: RelatedPhotoModel.array(),
  project: RelatedProjectModel.array(),
}))
