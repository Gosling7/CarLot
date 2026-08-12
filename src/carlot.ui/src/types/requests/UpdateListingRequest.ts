import type { ListingStatus } from "../enums/ListingStatus";

export type UpdateListingRequest = {
  vin: string;
  description: string;
  price: number;
  status: ListingStatus;
};
