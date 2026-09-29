export type ProblemDetails = {
  type: string;
  title: string;
  status: number;
  instance: string;
  errors: Record<string, string[]>;
  traceId: string;
};
