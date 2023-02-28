import fetchify from "./Fetchify.js";

fetchify.init({
  baseURL: "https://jsonplaceholder.typicode.com",
});

fetchify
  .GET({
    URL: "/todos",
    cancelKey: "allTodos",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

fetchify
  .GET({
    URL: "/todos/2",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

fetchify.cancel("allTodos");
