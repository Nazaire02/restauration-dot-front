
export type ErrorResponse = {
  statusCode: number;
  details: string;
};

export function isErrorResponse(error: unknown): error is ErrorResponse {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "details" in error &&
    typeof (error as ErrorResponse).statusCode === "number" &&
    typeof (error as ErrorResponse).details === "string"
  );
}

export function handleError(error: string, statusCode: number, details: string): ErrorResponse {
  return { statusCode, details };
}
