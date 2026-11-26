export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  extensions?: {
    code?: string;
    [key: string]: any;
  };
}

export interface ApiErrorResponse {
  message: string;
  code?: string;
  status: number;
  problemDetails?: ProblemDetails;
}
