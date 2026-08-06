import type { ListingStatus } from "../enums/ListingStatus";

export type UpdateListingRequest = {
  description: string;
  price: number;
  status: ListingStatus;
};
