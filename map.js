// This is all of the code that controls the map and the sidebar content.
// Try making it your own by checking out the [TRY IT] sections.
// ---------------------------------------------------------------

// We have to wait until the DOM content has loaded before
// initializing a new map
document.addEventListener('DOMContentLoaded', function() {
  // Replace this access token with your own if
  // you plan to use this template in another application.
  // Get a token from mapbox.com/studio/account/tokens
  mapboxgl.accessToken = 'pk.eyJ1IjoibmJiMTI4MDUiLCJhIjoiY2o3eTN4Y3R5NXQ3ZDJ3cW5yMnVwYzVmdyJ9.rA_Z0QLuHzufgnxn-Fgvqw';
  
  // Initialize a new map in the div that
  // has the id of 'map'
  var map = new mapboxgl.Map({
    container: 'map',
    // **********************************************************
    // [TRY IT] - Change the map style to another default
    // style at mapbox.com/mapbox-gl-js/api/#map
    // **********************************************************
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-77.04, 38.907],
    zoom: 12
  });
  
  // Wait until the map to finish loading before
  // trying to add any data to it.
  map.on('load', function() {
    map.addLayer({
      id: 'locations',
      // **********************************************************
      // [TRY IT] - Change the circle to a symbol layer
      // mapbox.com/mapbox-gl-js/style-spec/#layers-symbol
      // **********************************************************
      type: 'circle',
      // Add a GeoJSON source that references the stores.geojson file
      source: {
        type: 'geojson',
        data: stores
      },
      paint: {
        "circle-radius": 8,
        "circle-color": "#BEBDD3",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#9096AF"
      }
    });
    
  });
  
  // Use the map's on click event listener
  // to populate the sidebar with information
  map.on('click', 'locations', function (e) {
    var location = e.features[0].properties;
    // Style the selected feature using a categorical
    // property function. For more information,
    // see mapbox.com/help/how-map-design-works/#data-driven-styles
    map.setPaintProperty('locations', 'circle-color',{
      "property":"name",
      "type":"categorical",
      "stops":[
        [location.name, "#4C4F5E"],
      ],
      "default": "#BEBDD3"
    });
    
    // Populate the sidebar with information from
    // the selected feature's properties
    document.getElementById('title').textContent = location.name;
    document.getElementById('image').src = location.image;
    document.getElementById('address').textContent = location.address;
    document.getElementById('phone').textContent = location.phone;
    
    // **********************************************************
    // [TRY IT] - Add a popup when a marker is clicked
    // mapbox.com/mapbox-gl-js/example/popup-on-click/
    // **********************************************************
  });
});