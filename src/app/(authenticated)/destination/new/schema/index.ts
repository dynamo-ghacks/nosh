import { z } from "zod";

export const createDestinationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  headline: z.string().min(1, "Headline is required"),
  description: z.string(),
  address: z.string().min(1, "Location is required"),
  latitude: z
    .number()
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  tags: z.array(z.string()),
  isVerified: z.boolean().default(false),
  image: z.string().optional(),
});

export type CreateDestination = z.infer<typeof createDestinationSchema>;
