import { useInfiniteQuery } from "@tanstack/react-query";
import { api } from "../../../shared/axios";

export function useFetchCars(
  isExpanded: boolean,
  search: string,
  pageSize: number,
) {
  return useInfiniteQuery({
    queryKey: ["cars", search],
    queryFn: async ({ pageParam }) => {
      const response = await api.get(
        `/cars?search=${search}&page=${pageParam}&pagesize=${pageSize}`,
      );

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
