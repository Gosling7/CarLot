import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/axios";

export function useFetchCars(isExpanded: boolean) {
  return useQuery({
    // TODO: check if more fancy keys are needed e.g. ["cars", "archived"]
    queryKey: ["cars"],
    queryFn: async (request) => {
      const response = await api.get("/cars", request);
      return response.data;
    },
    enabled: isExpanded,
  });
}
