import { api } from "@/lib/axios";
import type { AddCarRequest } from "@/types/AddCarRequest";
import type { ProblemDetails } from "@/types/ProblemDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation<string, AxiosError<ProblemDetails>, AddCarRequest>({
    mutationFn: (newCar: AddCarRequest) => {
      const response = api.post("/cars", newCar).then((r) => r.data);
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      console.log("Car created", data);
    },
  });
}
