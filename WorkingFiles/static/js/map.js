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
//  let marker = L.marker([data[0]['lat'], data[0]['lon']], {
//    draggable: true,
//    title: "My First Marker"
//  }).addTo(myMap);
// -------------------
for (let i = 0; i < data.length; i++) {
  L.circle([data[i]['lat'], data[i]['lon']], {
    fillOpacity: 0.75,
    color: '#F28871',
    fillColor: '#22325A',
    fillOpacity: 0.5,
    radius: 5000
  }).addTo(myMap);
}
// .bindPopup(`<h1>${data[i].name}</h1> <hr> <h3>Population: ${cities[i].population.toLocaleString()}</h3>`)

//if (data[0] && data[0].parameter_name && data[0].lat && data[0].lon) {
//  circle.bindPopup(`Parameter Name: ${data[0].parameter_name}<br>Latitude: ${data[0].lat.toString()}<br>Longitude: ${data[0].lon.toString()}`);
//} else {
//  console.error("Invalid data:", data[0]);
//}
