import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type UseFetchEquipmentProps = {
  enabled: boolean;
};

export function useFetchEquipment({ enabled }: UseFetchEquipmentProps) {
  return useQuery({
    queryKey: ["equipment"],
    queryFn: async () => {
      const response = await api.get(`/equipment`);
      return response.data;
    },
    enabled: enabled,
  });
}
