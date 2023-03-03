import fetchify from "./Fetchify.js";

fetchify.init({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//example with GET
fetchify
  .GET({
    url: "/todos",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

//example with GET query string params
fetchify
  .GET({
    url: "/todos",
    queryStringParams: { age: 25, country: "LK" },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

//example with POST
fetchify
  .POST({
    url: "/users",
    data: { name: "NINA", age: 25 },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

//example with POST - File upload
fetchify
  .POST({
    url: "/users",
    data: { name: "NINA", age: 25 },
    files: {
      file: new File(["text,ejheqehqe"], "text.txt", { type: "text" }),
    },
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

//example cancel Request
fetchify
  .GET({
    url: "/todos",
    cancelKey: "cancelKeyName",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

fetchify.cancel("cancelKeyName");
