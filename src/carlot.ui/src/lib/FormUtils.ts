import type { UseFormSetError } from "react-hook-form";
import type { ProblemDetails } from "../types/ProblemDetails";
import type { AddCarRequest } from "../types/AddCarRequest";
import type { AddCarFormValues } from "./validation/addCar.schema";
import type { AddListingRequest } from "@/types/AddListingRequest";

export function setErrorsInForm(
  problem: ProblemDetails,
  setError: UseFormSetError<AddCarRequest | AddListingRequest>,
) {
  Object.entries(problem.errors).forEach(([key, messages]) => {
    const field = key.charAt(0).toLowerCase() + key.slice(1);
    setError(field as keyof AddCarFormValues, {
      type: "server",
      message: messages.join(" "),
    });
  });
}
