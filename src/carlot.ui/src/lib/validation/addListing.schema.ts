import z from "zod";

export const AddListingSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  price: z.number().gt(0),
  description: z.string().min(1, "Description is required"),
});

export type AddListingFormValues = z.infer<typeof AddListingSchema>;
