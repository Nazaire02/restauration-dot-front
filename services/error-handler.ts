
export type ErrorResponse = {
  error: string;
  statusCode: number;
  details: string;
};

export function handleError(error: string, statusCode: number, details: string): ErrorResponse {
  return { error, statusCode, details };
}
