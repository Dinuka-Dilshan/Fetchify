# Fetchify
[Experimental]  Wrapper around native fetch API
# Create Instance
Initialize `fetchify` with basic configurations.

    import fetchify from "./Fetchify.js";
    
    fetchify.init({
	    baseURL: "base_url",
	    headers:{}
    });

# GET Request
`fetchify`  directly provides you the Data . No need to call `res.json()`.
 You can easily add query string params as an object.
	
      fetchify.GET({
	    url:  "/url",
	    queryStringParams: { age:  25, country:  "LK" },
	  })
      .then((response) => {
       console.log(response);
      })
     .catch((error) =>  console.log(error));

## POST Request

You can provide files and data values directly and `fetchify` will automatically convert then to FormData values if you provide files, otherwise it will convert to JSON.
	


    fetchify.POST({
	    url:  "/users",
	    data: { name:  "NINA", age:  25 },
	    files: {
	     file1:  new  File(),
	     file2:  new  File(),
        },
    })
    .then((response) => {
       console.log(response);
    })
    .catch((error) =>  console.log(error));
	
## Cancel  Request

You can cancel a request by providing a string as a cancel key. Internally `fetchify` uses `AbortController` as the signal to cancel a request.
	


    fetchify.POST({
	    url:  "/users",
	    data: { name:  "NINA", age:  25 },
	    cancelKey:  "cancelKeyName",
    })
    .then((response) => {
       console.log(response);
    })
    .catch((error) =>  console.log(error));

    fetchify.cancel("cancelKeyName");
