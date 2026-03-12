import { api } from "@/lib/axios";
import type { CarStatus } from "@/types/CarDto";
import { useInfiniteQuery } from "@tanstack/react-query";

type UseFetchCarsOptions = {
  isExpanded: boolean;
  search: string;
  pageSize: number;
  statuses: CarStatus[];
  queryKey: string[];
};

export function useFetchCars({
  isExpanded,
  search = "",
  pageSize,
  statuses,
  queryKey,
}: UseFetchCarsOptions) {
  return useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams();
      params.append("search", search);
      params.append("page", String(pageParam));
      params.append("pagesize", String(pageSize));
      statuses.forEach((s) => params.append("status", String(s)));
      const response = await api.get(`/cars?${params}`);
      return response.data;
    },
    initialPageParam: 1,
    enabled: isExpanded,
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
      const loaded = lastPage.page * lastPage.pageSize;
      if (loaded >= lastPage.totalItemsCount) {
        return undefined;
      }

      return lastPage.page + 1;
    },
  });
}
