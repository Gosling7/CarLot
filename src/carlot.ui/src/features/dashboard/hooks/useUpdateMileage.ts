import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateMileageOptions = {
  vin: string;
  mileage: number;
  onSuccess: () => void;
};

export function useUpdateMileage({
  vin,
  mileage,
  onSuccess,
}: UseUpdateMileageOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/cars/${vin}/mileage`, mileage);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carByVin", vin] });
      onSuccess?.();
    },
  });
}
