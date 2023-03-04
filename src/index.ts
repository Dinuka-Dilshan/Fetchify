import fetchify from "./Fetchify.js";

fetchify.init({
  baseURL: "https://dummyjson.com",
});

//example with GET
fetchify
  .GET({
    url: "/users",
  })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => console.log(error));
