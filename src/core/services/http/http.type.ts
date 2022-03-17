export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface HttpOptions {
  queryParams?: Record<string, ParamTypes>;
  body?: Record<string, unknown> | FormData;
  headers?: Record<string, unknown>;
  multipart?: boolean;
}

type ParamTypes =
  | number
  | string
  | string[]
  | undefined
  | { [key: string]: any };
