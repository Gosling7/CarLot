import { api } from "@/shared/api/axios";
import type { AddCarRequest } from "@/features/cars/types/AddCarRequest";
import type { ProblemDetails } from "@/shared/api/ProblemDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

type UseEditCarProps = {
  vin: string;
};

export function useEditCar({ vin }: UseEditCarProps) {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ProblemDetails>, AddCarRequest>({
    mutationFn: async (newCar: AddCarRequest) => {
      const response = await api.patch(`/cars/${vin}/edit`, newCar);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log("Car created", data);
    },
  });
}
