import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ProblemDetails } from "@/shared/api/ProblemDetails";

export function setErrorsInForm<T extends FieldValues>(
  problem: ProblemDetails,
  setError: UseFormSetError<T>,
) {
  Object.entries(problem.errors).forEach(([key, messages]) => {
    const field = key.charAt(0).toLowerCase() + key.slice(1);
    setError(field as Path<T>, {
      type: "server",
      message: messages.join(" "),
    });
  });
}
