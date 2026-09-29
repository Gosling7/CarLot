import type { ListingStatus } from "@/features/listings/types/ListingStatus";

export type UpdateListingRequest = {
  vin: string;
  description: string;
  price: number;
  status: ListingStatus;
};
