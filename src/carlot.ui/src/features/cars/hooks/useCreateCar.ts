import { useMutation } from "@tanstack/react-query"
import { createCar } from "../api/createCar"

export function useCreateCar() {
  return useMutation({
    mutationFn: createCar
  });
}
