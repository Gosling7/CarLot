import { ListingStatus } from "@/types/enums/ListingStatus";
import z from "zod";

export const UpdateListingSchema = z.object({
  vin: z.string().min(1, "VIN is required"),
  price: z.number().gt(0),
  description: z.string().min(1, "Description is required"),
  status: z.enum(ListingStatus)
});

export type UpdateListingForm = z.infer<typeof UpdateListingSchema>;
