import fetchify from "./Fetchify.js";

fetchify.init({
  baseURL: "https://jsonplaceholder.typicode.com",
});

//example with GET
fetchify
  .GET({
    URL: "/todos",
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.log(error));

  //example with GET query string params
fetchify
.GET({
  URL: "/todos",
  params:{age:25,country:'LK'}
})
.then((data) => {
  console.log(data);
})
.catch((error) => console.log(error));

//example with POST
fetchify
.POST({
  URL: "/users",
  data:{name:'NINA',age:25}
})
.then((data) => {
  console.log(data);
})
.catch((error) => console.log(error));

//example with POST - File upload
fetchify
.POST({
  URL: "/users",
  data:{name:'NINA',age:25},
  files:{
    file:new File(['text'],'text.txt',{type:'text'})
  }
})
.then((data) => {
  console.log(data);
})
.catch((error) => console.log(error));



