import { api } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UseUpdateEquipmentProps = {
  vin: string;
  equipmentCodes: string[];
  onSuccess: () => void;
};

export function useUpdateEquipment({
  vin,
  equipmentCodes,
  onSuccess,
}: UseUpdateEquipmentProps) {
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
      onSuccess?.();
    },
  });
}
