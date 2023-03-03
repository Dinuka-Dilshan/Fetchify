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
