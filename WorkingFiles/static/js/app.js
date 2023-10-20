// STEP 1. Use D3 library to read in API from the API URL
// Constant to hold the URL
let url = "/test"

// Initializes the page with a default plot
d3.json(url).then(function(data) {
console.log(data);
 });
