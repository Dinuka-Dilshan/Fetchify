import { ResponseBuilder } from "./types";

const responseBuilder: ResponseBuilder = async (response) => {
  if (response.ok) {
    const data = await response.json();
    return Promise.resolve({
      data,
      statusCode: response.status,
      statusText: response.statusText,
      response,
    });
  } else {
    return Promise.reject({
      error: response.statusText,
      errorCode: response.status,
      response,
    });
  }
};

export default responseBuilder;
