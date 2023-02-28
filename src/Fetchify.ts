let baseURL: string | undefined;
let headers: HeadersInit | undefined;
const controllers = new Map<string, AbortController>();

const init = (init: { baseURL?: string; headers?: HeadersInit }) => {
  baseURL = init.baseURL;
  headers = init.headers;
};

const queryStringParamsBuilder = (params: { [key: string]: any }) => {
  return Object.keys(params).reduce((url, key, index) => {
    if (index === 0) {
      return `${url}${key}=${params[key]}`;
    }
    return `${url}&${key}=${params[key]}`;
  }, "?");
};

const GET = (init: {
  URL: string;
  params?: { [key: string]: any };
  cancelKey?: string;
}) => {
  const fullURL = baseURL
    ? init.params
      ? `${baseURL}${init.URL}${queryStringParamsBuilder(init.params)}`
      : `${baseURL}${init.URL}`
    : init.URL;

  if (init.cancelKey) {
    controllers.set(init.cancelKey, new AbortController());
  }

  return fetch(fullURL, {
    headers,
    signal: init.cancelKey ? controllers.get(init.cancelKey)?.signal : null,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const POST = (init: {
  URL: string;
  params?: { [key: string]: any };
  cancelKey?: string;
  data?: { [key: string]: any };
  files?: { [key: string]: any };
}) => {
  const fullURL = baseURL
    ? init.params
      ? `${baseURL}${init.URL}${queryStringParamsBuilder(init.params)}`
      : `${baseURL}${init.URL}`
    : init.URL;

  if (init.cancelKey) {
    controllers.set(init.cancelKey, new AbortController());
  }

  let body;

  if (!!init.files) {
    body = formDataBuilder({ ...init.files, ...init.data });
  } else {
    body = JSON.stringify(init.data);
  }

  return fetch(fullURL, {
    method: "POST",
    headers,
    body,
    signal: init.cancelKey ? controllers.get(init.cancelKey)?.signal : null,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(res);
      }
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const formDataBuilder = (data: { [key: string]: any }) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

export default {
  init,
  GET,
  POST,
  cancel: (cancelKey: string) => controllers.get(cancelKey)?.abort(),
};
