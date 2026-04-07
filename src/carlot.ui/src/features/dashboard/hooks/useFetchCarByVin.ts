import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type UseFetchCarByVinOptions = {
  vin: string;
  enabled: boolean;
};

export function useFetchCarByVin({ vin, enabled }: UseFetchCarByVinOptions) {
  return useQuery({
    queryKey: ["carByVin", vin],
    queryFn: async () => {
      const response = await api.get(`/cars/${vin}`);
      return response.data;
    },
    enabled: enabled,
  });
}
