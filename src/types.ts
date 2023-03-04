export type FetchifyRequest = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  queryStringParams?: {
    [key: string]: string | number;
  };
  data?: {
    [key: string]: any;
  };
  files?: {
    [key: string]: any;
  };
  cancelKey?: string;
  headers?: HeadersInit;
};

export type InternalFetchifyRequest = FetchifyRequest & {
  baseURL?: string;
  headers?: HeadersInit;
  controllers: Map<string, AbortController>;
};

export type ResponseBuilder = (
  response: Response
) => Promise<FetifySuccessType>;

export type FetifyRejectType = {
  error: string;
  errorCode: number;
  response: Response;
};

export type FetifySuccessType = {
  data: any;
  statusCode: number;
  statusText: string;
  response: Response;
};
