import { api } from "@/lib/axios";
import type { CarStatus } from "@/types/CarDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateStatusOptions = {
  vin: string;
  status: CarStatus;
};

export function useUpdateStatus({ vin, status }: UseUpdateStatusOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/cars/${vin}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carByVin", vin] });
    },
  });
}
