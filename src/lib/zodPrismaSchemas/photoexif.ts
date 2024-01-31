import * as z from "zod"

export const PhotoExifModel = z.object({
  id: z.string(),
  aspectRatio: z.number(),
  make: z.string().nullish(),
  model: z.string().nullish(),
  focalLength: z.number().nullish(),
  focalLengthIn35MmFormat: z.number().nullish(),
  fNumber: z.number().nullish(),
  iso: z.number().nullish(),
  exposureTime: z.number().nullish(),
  exposureCompensation: z.number().nullish(),
  latitude: z.number().nullish(),
  longitude: z.number().nullish(),
  filmSimulation: z.string().nullish(),
  takenAt: z.string(),
  takenAtNaive: z.string(),
  photoId: z.string(),
})
