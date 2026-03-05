import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../shared/axios";
import type { AddCarRequest } from "../../../types/AddCarRequest";
import type { AxiosError } from "axios";
import type { ProblemDetails } from "../../../types/ProblemDetails";

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
