import { api } from "@/lib/axios";
import type { CarStatus } from "@/types/CarDto";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateStatusOptions = {
  vin: string;
  status: CarStatus;
  onSuccess: () => void;
};

export function useUpdateStatus({
  vin,
  status,
  onSuccess,
}: UseUpdateStatusOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/cars/${vin}/status`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carByVin", vin] });
      onSuccess?.();
    },
  });
}
