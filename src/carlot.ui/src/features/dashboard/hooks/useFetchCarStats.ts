import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export function useFetchCarStats() {
  return useQuery({
    queryKey: ["car-stats"],
    queryFn: async () => {
      const response = await api.get("cars/stats");
    },
  });
}
