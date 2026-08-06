import z from "zod";

export const UpdateListingSchema = z.object({
  price: z.number().gt(0),
  description: z.string().min(1, "Description is required"),
});

export type UpdateListingForm = z.infer<typeof UpdateListingSchema>;
