import requestBuilder from "./Request.js";
import responseBuilder from "./Response.js";
import { FetchifyRequest } from "./types";

let baseURL: string | undefined;
let headers: HeadersInit | undefined;
const controllers = new Map<string, AbortController>();

const init = (init: { baseURL?: string; headers?: HeadersInit }) => {
  baseURL = init.baseURL;
  headers = init.headers;
};

const GET = (init: Omit<FetchifyRequest, "method" | "data" | "files">) => {
  const { url, ...rest } = requestBuilder({
    controllers,
    method: "GET",
    url: init.url,
    queryStringParams: init.queryStringParams,
    cancelKey: init.cancelKey,
    headers: init.headers || headers,
    baseURL,
  });

  return fetch(url, rest).then(responseBuilder);
};

const POST = (init: Omit<FetchifyRequest, "method" | "queryStringParams">) => {
  const { url, ...rest } = requestBuilder({
    controllers,
    method: "POST",
    url: init.url,
    cancelKey: init.cancelKey,
    headers: { ...headers, ...init.headers },
    baseURL,
    data: init.data,
    files: init.files,
  });

  return fetch(url, rest).then(responseBuilder);
};

export default {
  init,
  GET,
  POST,
  cancel: (cancelKey: string) => {
    controllers.get(cancelKey)?.abort();
    controllers.delete(cancelKey);
  },
};
