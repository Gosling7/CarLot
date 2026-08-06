import { api } from "@/lib/axios";
import type { AddListingRequest } from "@/types/AddListingRequest";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useCreateListing() {
  const queryClient = useQueryClient();

  // TData to placeholder string
  return useMutation<string, AxiosError<ProblemDetails>, AddListingRequest>({
    mutationFn: async (newListing: AddListingRequest) => {
      const response = await api.post("/listings", newListing);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      console.log("Listing created", data);
    },
  });
}
