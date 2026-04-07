import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateEquipmentOptions = {
  vin: string;
  equipmentCodes: string[];
};

export function useUpdateEquipment({
  vin,
  equipmentCodes,
}: UseUpdateEquipmentOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await api.patch(`/cars/${vin}/equipment`, {
        equipmentCodes,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carByVin", vin] });
    },
  });
}
