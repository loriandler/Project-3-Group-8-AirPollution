// Creating our initial map object:
console.log ("Data from Flask (external JavaScript):", data);
//console.log(data.features) ;

//JSON.parse(data)
// We set the longitude, latitude, and starting zoom level.
// This gets inserted into the div with an id of "map".
let myMap = L.map("map", {
    center: [36.57, -120.71],
    zoom: 6
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // this works
  let marker = L.marker([data[0]['lat'], data[0]['lon']], {
    draggable: true,
    title: "My First Marker"
  }).addTo(myMap);
// -------------------
//for (let i = 0; i < data.length; i++) {
//  latOne = data[i]['lat']
//  lonOne = data[i]['lon']
//  let marker = L.marker([latOne,lonOne]).addTo(myMap);
//}

//function(result){
// result.forEach(function(data){
//   var lat = data.lat;
 //   var lng = data.lng;
//   var marker = L.marker([lat, lng]).addTo(map);//
//});
//}

//function(result){
//  result.forEach(function(data){
 //   var lat = data['lat'];
//    var lon = data['lon'];
//    var marker = L.marker([lat, lon]).addTo(map);//
//  });
//}

//L.marker([{ marker('lat') }, { marker('lon') }]).addTo(map)  

// L.marker([{ marker([data[0]['lat'], data[0]['lon']]) }]).addTo(map) - yuck