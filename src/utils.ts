export const formDataBuilder = (data: { [key: string]: any }) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => formData.append(key, data[key]));
  return formData;
};

export const queryStringParamsBuilder = (params: { [key: string]: any }) => {
  return Object.keys(params).reduce((url, key, index) => {
    if (index === 0) {
      return `${url}${key}=${params[key]}`;
    }
    return `${url}&${key}=${params[key]}`;
  }, "?");
};
