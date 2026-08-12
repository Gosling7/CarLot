import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type UseFetchListingByVinOptions = {
    vin: string;
    enabled: boolean;
}

export function useFetchListingByVin({ vin, enabled }: UseFetchListingByVinOptions) {
    return useQuery({
        queryKey: ["listingByVin", vin],
        queryFn: async () => {
            const response = await api.get(`/listings/${vin}`);
            return response.data;
        },
        enabled: enabled,
    });
}
