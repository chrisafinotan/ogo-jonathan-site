import * as z from "zod"
import * as imports from "../../../prisma/null"
import { CompleteProject, RelatedProjectModel } from "./index"

export const ProjectTagModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  text: z.string(),
  description: z.string(),
})

export interface CompleteProjectTag extends z.infer<typeof ProjectTagModel> {
  project: CompleteProject[]
}

/**
 * RelatedProjectTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedProjectTagModel: z.ZodSchema<CompleteProjectTag> = z.lazy(() => ProjectTagModel.extend({
  project: RelatedProjectModel.array(),
}))
