/* =====================
   You should NOT need to change this file (though you are not forbidden from doing so)
===================== */

/* =====================
  Call getAndParseData to grab our dataset through a jQuery.ajax call ($.ajax)
===================== */
//prepare the transformed data from csv

//claim the global variables:


//////////////////////////////////////PART 1  MAP SET UP////////////////////////////////////////////////////
var map = L.map('map', {
  center: [32.9670, 117.5370],
  zoom: 5
});

var layerMappedMarkers;
var slideNumber = 0;
var parsedData;
var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";

///1.1 DEFINE GLOBAL VARIABLES

var url = "https://search.mapzen.com/v1/search?api_key=mapzen-Dok7vcm&size=1&text=";
var newurl = "";

var OriginLat = "";
var OriginLon = "";
var DestLat = "";
var DestLon = "";
var featureGroup=[];

///1.2 DEFINE IMAGES AND ICONS

var myIcon = new L.icon({
    iconUrl: 'https://image.ibb.co/n9sG1Q/city_icons_3_01_01.png',
    iconSize:     [50, 50],
    shadowSize:   [50, 64],
    iconAnchor:   [20, 20],
});

///////////////Q1 ICON CUSTOMIZATION
// var cityIcon = L.icon({
//         iconURL: 'city_icons-01.png',
//         iconSize:     [38, 38], // size of the icon
//         iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
//         popupAnchor:  [-3, -76]
//     });
// L.marker([112,40],{icon:cityIcon}).addTo(map);


//////////////////////////////////////////PART 2  USER INPUT////////////////////////////////
///2.1 DEFINE ADD PAGE FUNCTION
// var state = {
//   slideNumber: 0,
//   slideData:[
//     {
//       "name": "Economic Development in Chinese Cities",
//       "content": "Here presented are economic development data for the 35 provincial capital cities in China",
//     },
//     {
//       "name": "Cities with the Highest Level GDP",
//       "content": "Look at the cities' GDPs. Click the marker to see.",
//       "filter": {
//         "key": "Year",
//         "comparison": "greaterThan",
//         "value": 1960
//       }
//     },
//     {
//       "name": "The Most Populated Cities",
//       "content": "These are the megacities with over 9,000,000 residents.",
//       "filter": {
//         "key": "Year",
//         "comparison": "greaterThan",
//         "value": 2000,
//       }
//     },
//     {
//       "name": "Investment-driven Growth Cities",
//       "content": "These are the cities with a high ratio of investment.",
//       "filter": {
//         "key": "Year",
//         "comparison": "lessThan",
//         "value": 2010,
//       },
//     },
//
//   ],
//   drawnOnMap: undefined,
//   dataSource: undefined
// };
//
//
// /* -----------------
// Load data
// ----------------- */
// $.ajax(dataset).done(function(data){
//   state.dataSource = JSON.parse(data);
//   // Add the first slide
//   addSlide(state.slideData[0]);
// });
//
//
// /* -----------------
// Application functions
// ----------------- */
//
// // Increase state counter by one
// var next = function() {
//   state.slideNumber++;
// };
//
// // Increase decrease state counter by one
// var previous = function() {
//   state.slideNumber--;
// };
//
// // Check to see if markers have been added to the map.
// // If they have, remove them. Checking first prevents an error.
// var removeDrawnOnMap = function() {
//   if (typeof state.drawnOnMap !== 'undefined') {
//     map.removeLayer(state.drawnOnMap);
//     state.drawnOnMap = undefined;
//   }
// }
//
// // Return a style object.
// // The object should contain a color based on the feature material type.
// var generateStyleObject = function(feature) {
//   if (feature.properties.Materials === "Steel") {
//     return { color: "#00DEA6" }
//   } else if (feature.properties.Materials === "Bronze") {
//     return { color: "#FFA58A" }
//   } else if (feature.properties.Materials === "Mixed media") {
//     return { color: "#FF3D5E" }
//   } else {
//     return { color: "#B591F5" }
//   }
// };
//
// var drawOnMap = function(data, filter) {
//   // If this particular slide includes the filter property,
//   // then apply the following filter. If not, ignore this code.
//   // This means I can choose whether a slide uses a filter based
//   // on whether or not I include a filter on the slide. Note that
//   // the first and last slides do not contain a filter.
//   if (typeof filter !== 'undefined') {
//     var filterFunction = function(feature) {
//       if (filter.comparison === "lessThan") {
//         return feature.properties[filter.key] < filter.value;
//       } else if (filter.comparison === "equals") {
//         return feature.properties[filter.key] === filter.value;
//       } else if (filter.comparison === "greaterThan") {
//         return feature.properties[filter.key] > filter.value;
//       }
//     }
//   }
//   // Create a leaflet layer and add it to the map. Store this layer
//   // as state.drawnOnMap. I will refer to this later when I want
//   // to remove this layer from the map and when I want to use getBounds
//   // to get the bounds of this layer.
//   state.drawnOnMap = L.geoJson(state.dataSource, {
//     filter: filterFunction,
//     pointToLayer: function (feature, latlng) {
//       var style = generateStyleObject(feature);
//       var popupText = feature.properties.Category + " by " + feature.properties.First_Name + " " + feature.properties.Last_Name;
//       return L.circleMarker(latlng, style).bindPopup(popupText);
//     }
//   }).addTo(map);
//   // fitBounds on the new Leaflet layer we just created to zoom in
//   // to this area.
//   map.fitBounds(state.drawnOnMap.getBounds(), {
//     padding: [20, 20]
//   });
// }
//
// var addSlide = function(slide) {
//   drawOnMap(state.dataSource, slide.filter);
//   $("#sidebar-heading").text(slide.name);
//   $("#sidebar-text").text(slide.content);
// };
//
//
//
// /* -----------------
// Click events
// ----------------- */
//
// $('#next-button').click(function() {
//   next();
//   removeDrawnOnMap();
//   // Note the use of state.slideData[state.slideNumber].
//   // This returns the slide for my current state.
//   addSlide(state.slideData[state.slideNumber]);
// });
//
// $('#previous-button').click(function() {
//   previous();
//   removeDrawnOnMap();
//   // Note the use of state.slideData[state.slideNumber].
//   // This returns the slide for my current state.
//   addSlide(state.slideData[state.slideNumber]);
// });
//
//

/////////////----------------------------------------------------------------------//////////////



///2.2 SEARCH AND ADD SEARCH RESULT TO MAP
$('#Search').click(function(){
  $(document).ready(function() {
    newurl = url + $('#dest').val();
    console.log(newurl);
    $.ajax(newurl).done(function(data){
      console.log("downloaded");
      var parsedData = JSON.parse(JSON.stringify(data));
      console.log("parsed");
      featureGroup.push(L.geoJSON(parsedData,{
        pointToLayer: function (feature, latLng) {
          console.log("added myicon");
          return new L.Marker(latLng, {
            // Specify which custom icon you want to use
            icon: myIcon
          });
        }
      }).addTo(map));
      DestLat = data.features[0].geometry.coordinates[1];
      DestLon = data.features[0].geometry.coordinates[0];
      console.log("added");
    });
  });
});



// // var currentlocation = [lat,lng];
//
// $(document).ready(function() {
//   /* This 'if' check allows us to safely ask for the user's current position */
//   if ("geolocation" in navigator) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       updatePosition(position.coords.latitude, position.coords.longitude, position.timestamp);
//       console.log("origin");
//       OriginLat = state.position.marker._latlng.lat;
//       OriginLon = state.position.marker._latlng.lng;
//     });
//   } else {
//     alert("Unable to access geolocation API!");
//   }
///////////////////////////////////////////////



// var drawControl = new L.Control.Draw({
//   draw: {
//     polyline: false,
//     polygon: false,
//     circle: false,
//     marker: true,
//     rectangle: false,
//   }
// });
//
// map.addControl(drawControl);


// var resetApplication = function() {
//   state.count = 0;
//   map.removeLayer(state.marker1);
//   state.marker1 = undefined;
//   map.removeLayer(state.marker2);
//   state.marker2 = undefined;
//   map.removeLayer(state.line);
//   state.line = undefined;
//   $('#button-reset').hide();
// };
//
// $('#button-reset').click(resetApplication);


//////////////////////////

//1. fix Jeff's suggestions
//2. try to incorporate search and zoom to function
//3. incorporate route calculating function
//4. comparing different level of economic development
//5. display nightlight data

map.on('draw:created', function (e) {
  var type = e.layerType; // The type of shape
  var layer = e.layer; // The Leaflet layer for the shape
  var id = L.stamp(layer); // The unique Leaflet ID for the

console.log('Do something with the layer you just created', layer, layer._latlng);
});

//set up map
// var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
//   attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   subdomains: 'abcd',
//   minZoom: 0,
//   maxZoom: 20,
//   ext: 'png'
// }).addTo(map);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);

//define the clickfunctions:
var clickNextButton = function(){
  var filteredData;
  var html;
  slideNumber++;
  if(slideNumber == 1){

    html = "<div></div>"
         + '<h3>Map: Cities with High Level GDP</h3>'
         + '<h4>what level is the GDP, please click the marker!</h4>'
         + '<p class="main">The GDP for this city is<span class="GDP"></span>.</p>'

    $('.explanation').empty();
    $('.explanation').append(html);
    $('#previous').show();


    map.removeLayer(layerMappedMarkers);
    filteredData = _.filter(parsedData.features,function(datum){
      return datum.properties.GDPlevel === "high";
    });
    filteredData = {
      type: "FeatureCollection",
      features: filteredData
    };

    layerMappedMarkers = L.geoJSON(filteredData,{
      pointToLayer: function (feature, latLng) {
        console.log("added myicon");
                        return new L.Marker(latLng, {
                            icon: myIcon
                          });
                        }
                      })
                      .addTo(map)
                      .eachLayer(function(layer){
                            layer.on('click', function(){
                              console.log('clicked');
                              console.log(layer.feature.properties.GDP);
                              $('.GDP').text(" " + layer.feature.properties.GDP);
                            });
                          })
                          .addTo(map);


  }else if(slideNumber == 2){
    console.log(slideNumber);

    //----------------------
    html = "<div></div>"
         + "<h3>Map: Cities with over 9 million population</h3>"
         + '<h4>what level is the Population, please click the marker!</h4>'
         + '<p class="main">The population for this city is<span class="population"></span> x 10,000 people.</p>'
    $('.explanation').empty();
    $('.explanation').append(html);

    //----------------------

    map.removeLayer(layerMappedMarkers);
    filteredData = _.filter(parsedData.features,function(datum){
      return datum.properties.Population > 900;
    });
    console.log(filteredData);
    filteredData = {
      type: "FeatureCollection",
      features: filteredData
    };

    //Add layer click event in this chained function calls
    layerMappedMarkers = L.geoJSON(filteredData)
                          .eachLayer(function(layer){
                            layer.on('click', function(){
                              console.log('clicked');
                              console.log(layer.feature.properties.Population);
                              $('.population').text(" " + layer.feature.properties.Population);
                            });
                          })
                          .addTo(map);

  }else if(slideNumber == 3){
    console.log(slideNumber);

    //----------------------
    html = "<div></div>"
         + '<h3>Map: Cities with higher than 50% investment in its GDP</h3>'
         + '<h4>what level is the investment ratio, please click the marker!</h4>'
         + '<p class="main">The investment ratio for this city is<span class="investment"></span>.</p>'
    $('.explanation').empty();
    $('.explanation').append(html);

    //----------------------
    map.removeLayer(layerMappedMarkers);
    filteredData = _.filter(parsedData.features,function(datum){
      return parseFloat(datum.properties['investment proportion'])>50;
    });
    console.log(filteredData);
    filteredData = {
      type: "FeatureCollection",
      features: filteredData
    };
    layerMappedMarkers = L.geoJSON(filteredData)
                          .eachLayer(function(layer){
                            layer.on('click', function(){
                              console.log('clicked');
                              console.log(layer.feature.properties['investment proportion']);
                              $('.investment').text(" " + layer.feature.properties['investment proportion']);
                            });
                          })
                          .addTo(map);


  }else{
    slideNumber = 0;
    console.log(slideNumber);
    // document.getElementById("back").style.display = "inline";
    $('#next').show();
    $('#previous').hide();
    $('.explanation').empty();
    map.removeLayer(layerMappedMarkers);
    layerMappedMarkers = L.geoJson(parsedData)
                          .addTo(map);
  }
};



/////////////////CLICK PREVIOUS BUTTON
var clickPreviousButton = function(){
  var filteredData;
  var html;
  slideNumber--;
  if(slideNumber == 1){

    html = "<div></div>"
         + '<h3>Map: Cities with High Level GDP</h3>'
         + '<h4>what level is the GDP, please click the marker!</h4>'
         + '<p class="main">The GDP for this city is<span class="GDP"></span>.</p>'

    $('.explanation').empty();
    $('.explanation').append(html);


    console.log(slideNumber);
    $('#previous').show();
    map.removeLayer(layerMappedMarkers);
    filteredData = _.filter(parsedData.features,function(datum){
      return datum.properties.GDPlevel === "high";
    });
    filteredData = {
      type: "FeatureCollection",
      features: filteredData
    };
    layerMappedMarkers = L.geoJSON(filteredData)
                          .eachLayer(function(layer){
                            layer.on('click', function(){
                              console.log('clicked');
                              console.log(layer.feature.properties.GDP);
                              $('.GDP').text(" " + layer.feature.properties.GDP);
                            });
                          })
                          .addTo(map);


  }else if(slideNumber == 2){

        html = "<div></div>"
             + "<h3>Map: Cities with over 9 million population</h3>"
             + '<h4>what level is the Population, please click the marker!</h4>'
             + '<p class="main">The population for this city is<span class="population"></span> x 10,000 people.</p>'
        $('.explanation').empty();
        $('.explanation').append(html);


    console.log(slideNumber);
    $('#previous').show();
    map.removeLayer(layerMappedMarkers);
    filteredData = _.filter(parsedData.features,function(datum){
      return datum.properties.Population > 900;
    });

    console.log(filteredData);
    filteredData = {
      type: "FeatureCollection",
      features: filteredData
    };
    layerMappedMarkers = L.geoJSON(filteredData)
                          .eachLayer(function(layer){
                            layer.on('click', function(){
                              console.log('clicked');
                              console.log(layer.feature.properties.Population);
                              $('.population').text(" " + layer.feature.properties.Population);
                            });
                          })
                          .addTo(map);

  }else{
    console.log(slideNumber);
    $('#previous').hide();
    $('.explanation').empty();
    map.removeLayer(layerMappedMarkers);
    layerMappedMarkers = L.geoJson(parsedData).addTo(map);
  }
};


$(document).ready(function() {
  $('#previous').hide();
  $.ajax(dataset).done(function(data) {
    parsedData = JSON.parse(data);
    layerMappedMarkers = L.geoJson(parsedData,{
      pointToLayer: function (feature, latLng) {
        console.log("added myicon");
        return new L.Marker(latLng, {
          // Specify which custom icon you want to use
          icon: myIcon
        });
      }
    }).addTo(map)
    .bindPopup("city name = ?");
    console.log(parsedData);
  });



  $('#next').click(function(){
    clickNextButton();
  });

  $('#previous').click(function(){
    clickPreviousButton();
  });
});
