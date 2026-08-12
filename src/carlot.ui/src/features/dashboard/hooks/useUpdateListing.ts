import { api } from "@/lib/axios";
import type { UpdateListingRequest } from "@/types/requests/UpdateListingRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateListingOptions = {
  vin: string;
  onSuccess: () => void;
};

export function useUpdateListing({ vin, onSuccess }: UseUpdateListingOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newListing: UpdateListingRequest) => {
      const response = await api.patch(`/listings/${vin}`, newListing);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listingByVin", vin] });
      onSuccess?.();
    },
  });
}

// TODO: move somewhere
// type UpdateListingRequest = {
//   description: string;
//   price: number;
//   status: string;
// };
