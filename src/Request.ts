import { HEADERS } from "./headers.js";
import { InternalFetchifyRequest } from "./types";
import { formDataBuilder, queryStringParamsBuilder } from "./utils.js";

const requestBuilder: (
  config: InternalFetchifyRequest
) => RequestInit & { url: string } = (config) => {
  let body;

  if (!!config.files && !!config.data) {
    body = formDataBuilder({ ...config.data, ...config.files });
  } else if (!!config.files) {
    body = formDataBuilder(config.files);
  } else if (!!config.data) {
    body = JSON.stringify(config.data);
  }

  let url = config.url;

  if (!!config.queryStringParams) {
    url = `${url}${queryStringParamsBuilder(config.queryStringParams)}`;
  }

  if (config.baseURL) {
    url = `${config.baseURL}${url}`;
  }

  let headers;

  if (!config.files) {
    headers = HEADERS.appJson;
  }

  if (!!config.headers) {
    headers = config.headers;
  }

  let signal: AbortSignal | undefined;

  if (!!config.cancelKey) {
    const controller = new AbortController();
    config.controllers.set(config.cancelKey, controller);
    signal = controller.signal;
  }

  return {
    method: config.method,
    body,
    url,
    headers,
    signal,
  };
};

export default requestBuilder;
