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
  zoom: 3.5
});

var layerMappedMarkers;
var slideNumber = 0;
var parsedData;
var parsedData2;
var parsedData3;
var parsedData4;
var dataset0 = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";
var dataset2 = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/housingprice_Beijing.geojson";
var dataset3 = "https://raw.githubusercontent.com/wenhaowuuu/FinalProject/master/data/china_provincies_def.geojson";


var filterFunction;

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);

///1.0 SET UP DIFFERENT BASE MAPS
///switch basemaps///
$('#dark').click(function(){
  L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#light').click(function(){
  L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});


$('#antique').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-antique/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#eco').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#midnight').click(function(){
  L.tileLayer('https://cartocdn_{s}.global.ssl.fastly.net/base-midnight/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});





///1.1 DEFINE GLOBAL VARIABLES
var url = "https://search.mapzen.com/v1/search?api_key=mapzen-Dok7vcm&size=1&text=";
var newurl = "";

var urlsmproute = "https://valhalla.mapzen.com/route?api_key=mapzen-Dok7vcm&json=";
var newurlsmproute = "";

var featureGroup = [];
var filteredfeatureGroup = [];
var jsontoadd = {"locations":[],"costing":"auto","directions_options":{"units":"miles"}};

var OriginLat = "";
var OriginLon = "";
var DestLat = "";
var DestLon = "";


///1.2 DEFINE IMAGES AND ICONS
var myIcon = new L.icon({
    iconUrl: 'https://image.ibb.co/b3jGbQ/city_icons_beijing_01.png',
    iconSize:     [30, 30],
    shadowSize:   [50, 64],
    iconAnchor:   [20, 20],
});

var myIcon2 = new L.icon({
    iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
    iconSize:     [30, 30],
    shadowSize:   [30, 44],
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

var state = {
  slideNumber: 0,
  slideData:[
    {
      "name": "The Original List of Chinese Cities",
      "content": "Here presented are economic development data for the 35 provincial capital cities in China.",
    },
    {
      "name": "Cities with the Highest GDP",
      "content": "These are the cities with the highest GDP. Move your mouse over the markers to see.",
      "filter": {
        "key": "GDP",
        "comparison": "greaterThan",
        "value": 12000,
      }
    },
    {
      "name": "The Most Populated Cities",
      "content": "These are the megacities with over 9,000,000 residents.",
      "filter": {
        "key": "Population",
        "comparison": "greaterThan",
        "value": 900,
      }
    },
    {
      "name": "Cities with the Highest Per Capita Income",
      "content": "These are the richest cities.",
      "filter": {
        "key": "PersonalAnnualIncome",
        "comparison": "greaterThan",
        "value": 60000,
      },
    },
  ],
  drawnOnMap: undefined,
  dataSource: undefined
};

/* -----------------
Load data
----------------- */
$.ajax(dataset).done(function(data){
  state.dataSource = JSON.parse(data);
  // Add the first slide
  addSlide(state.slideData[0]);
});

/* -----------------
Application functions
----------------- */
// Increase state counter by one
var next = function() {
  state.slideNumber++;
};

// Increase decrease state counter by one
var previous = function() {
  state.slideNumber--;
};

// Check to see if markers have been added to the map.
// If they have, remove them. Checking first prevents an error.
var removeDrawnOnMap = function() {
  if (typeof state.drawnOnMap !== 'undefined') {
    map.removeLayer(state.drawnOnMap);
    state.drawnOnMap = undefined;
  }
};




// //////FROM JEFF'S DEMO///////
// Return a style object.
// The object should contain a color based on the feature material type.
var generateStyleObject = function(feature) {
  if (feature.properties.PersonalAnnualIncomeLevel == "high") {
    return { color: "#00DEA6" };
  } else if (feature.properties.PersonalAnnualIncomeLevel == "medium") {
    return { color: "#FFA58A" };
  } else if (feature.properties.PersonalAnnualIncomeLevel == "low") {
    return { color: "#FF3D5E" };
  } else {
    return { color: "#B591F5" };
  }
};

var drawOnMap = function(data, filter) {
  // If this particular slide includes the filter property,
  // then apply the following filter. If not, ignore this code.
  // This means I can choose whether a slide uses a filter based
  // on whether or not I include a filter on the slide. Note that
  // the first and last slides do not contain a filter.
  if (typeof filter !== 'undefined') {
    filterFunction = function(feature) {
      if (filter.comparison === "lessThan") {
        return feature.properties[filter.key] < filter.value;
      } else if (filter.comparison === "equals") {
        return feature.properties[filter.key] === filter.value;
      } else if (filter.comparison === "greaterThan") {
        return feature.properties[filter.key] > filter.value;
      }
    };
  }
  // Create a leaflet layer and add it to the map. Store this layer
  // as state.drawnOnMap. I will refer to this later when I want
  // to remove this layer from the map and when I want to use getBounds
  // to get the bounds of this layer.

state.drawnOnMap = L.geoJson(state.dataSource, {
    filter: filterFunction,
    pointToLayer: function (feature, latlng) {
      var style = generateStyleObject(feature);
      var popupText = "In 2009, " +feature.properties.CityName + " has a GDP of RMB " +feature.properties.GDP + "00 million. It has a population of " + feature.properties.Population + "0000. " + feature.properties['investment proportion'] +" of its economy is driven by investment.";
      return new L.Marker(latlng, {
        icon: myIcon2
      })
      .bindPopup(popupText);
    }
  }).addTo(map);
  // map.fitBounds(state.drawnOnMap.getBounds(), {
  //   padding: [20, 20]
  // });
};


///////////////////////////////

var addSlide = function(slide) {
  drawOnMap(state.dataSource, slide.filter);
  $("#sidebar-heading").text(slide.name);
  $("#sidebar-text").text(slide.content);
};



/* -----------------
Click events
----------------- */

$('#next').click(function() {
  next();
  removeDrawnOnMap();
  // Note the use of state.slideData[state.slideNumber].
  // This returns the slide for my current state.
  addSlide(state.slideData[state.slideNumber]);
});

$('#previous').click(function() {
  previous();
  removeDrawnOnMap();
  // Note the use of state.slideData[state.slideNumber].
  // This returns the slide for my current state.
  addSlide(state.slideData[state.slideNumber]);
});

/////////////----------------------------------------------------------------------//////////////




/////////////////////////ADD MAPS FROM CARTODB//////////////////////////////////
////GLOBAL LEVEL////
////Add this map of global cities////////////////
var cartoUserName = 'wenhaowuuu';
var cartoVizId0 = '49121306-26ae-11e7-9a30-0e233c30368f';
var layerUrl0 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId0+'/viz.json';
console.log('global city added');

var cartoVizId1 = 'd7586d72-26d6-11e7-9427-0e3ebc282e83';
var layerUrl1 = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId1+'/viz.json';
console.log('provinces added');

cartodb.createLayer(map, layerUrl0)
  .on('done', function(layer1) {
    layer1.addTo(map);
    console.log('cities added1');
    $('#beijing').click(function(){
        layer1.hide();
    });
    $('#global').click(function(){
      map.fitBounds(layer1.getBounds(),{
        padding: [10,10]
      });
    });
  }).on('error', function(err) {
    console.log(err);
  });

$('#national').click(function(){
  cartodb.createLayer(map, layerUrl1)
    .on('done', function(layer1) {
      layer1.addTo(map);
      console.log('provinces added1');
      $('#beijing').click(function(){
          layer1.hide();
      });
    }).on('error', function(err) {
      console.log(err);
    });
});



//1. fix Jeff's suggestions
//2. try to incorporate search and zoom to function
//3. incorporate route calculating function
//4. comparing different level of economic development
//5. display nightlight data

////////Investigate this please
// map.on('draw:created', function (e) {
//   var type = e.layerType; // The type of shape
//   var layer = e.layer; // The Leaflet layer for the shape
//   var id = L.stamp(layer); // The unique Leaflet ID for the
// console.log('Do something with the layer you just created', layer, layer._latlng);
// });



////PROVINCE WITH GDP GROWTH RATE////
///DEFINE STYLE AND FILTER///
var myStyle2=function(feature){
  var Rate = feature.properties.bbp_groei_____per_provincie__2013_;
  var Number = parseFloat(Rate);
  console.log(Number);

  if (Number<7.7){
    return{color:"#486cd3"};
  }else if(7.7<Number && Number<10.0){
    return{color:"#48d3af"};
  }else if(10.0<Number){
    return{color:"#e73115"};
  }
};
var myFilter2 = function(feature) {
  if (feature.properties.bbp_groei_____per_provincie__2013_===' ') {
  return false;
  }
  else {
    return true;
  }
};

////ADD PROVINCE WITH GDP GROWTH RATE////
$(document).ready(function(){
  $.ajax(dataset3).done(function(data) {
    parsedData3 = JSON.parse(data);
    console.log("parsed3");
    layerMappedPolygons = L.geoJson(parsedData3,
      {
        style: myStyle2,
        filter: myFilter2,
        pointToLayer: function (feature, latlngs) {
          // htmlshow = "<div><p>This province has a GDP growth rate of </p></div>";
          // var show = htmlshow + feature.properties.bbp_groei_____per_provincie__2013_;
          return new L.Polygon(latlngs, {
        });
      // }.onmouseover(function(){
      //   show.style.display = 'block';
      // }).onmouseout(function(){
      //   show.style.display = 'none';
    }}).addTo(map).bindPopup(feature.properties.bbp_groei_____per_provincie__2013_);
  });
});


///CITY DATA PRESENTATION
// var layerMappedMarkers;
//CITY DATA WITH POPULATION SIZE////
$(document).ready(function() {
        $('#citypop').click(function(){
          map.removeLayer(state.drawnOnMap);
          map.removeLayer(layerMappedMarkers);
            layerMappedMarkers = L.geoJson(state.dataSource,{
            pointToLayer: function (feature, latlng) {
              return new L.Marker(latlng, {
                icon:
                      new L.icon({
                      iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                      iconSize:     [feature.properties.Population*0.03, feature.properties.Population*0.03],                      shadowSize:   [30, 44],
                      iconAnchor:   [20, 20],
                  })
                }).bindPopup(feature.properties.CityName + ': ' + feature.properties.Population);
            }
          }).addTo(map);
      });

      $('#citygdp').click(function(){
        map.removeLayer(state.drawnOnMap);
        map.removeLayer(layerMappedMarkers);
        layerMappedMarkers = L.geoJson(parsedData,{
        pointToLayer: function (feature, latlng) {
            return new L.Marker(latlng, {
              icon:
                  new L.icon({
                  iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                  iconSize:     [feature.properties.GDP*0.003, feature.properties.GDP*0.003],
                  shadowSize:   [30, 44],
                  iconAnchor:   [20, 20],
                })
              }).bindPopup(feature.properties.CityName + ': ' + feature.properties.GDP);
          }
        }).addTo(map);
      });

      $('#cityincome').click(function(){
        map.removeLayer(state.drawnOnMap);
        map.removeLayer(layerMappedMarkers);
        layerMappedMarkers = L.geoJson(parsedData,{
        pointToLayer: function (feature, latlng) {
          return new L.Marker(latlng, {
            icon:
                  new L.icon({
                  iconUrl: 'https://image.ibb.co/h1dYFk/city_icons_01.png',
                  iconSize:     [feature.properties.PersonalAnnualIncome*0.0007, feature.properties.PersonalAnnualIncome*0.0007],
                  shadowSize:   [30, 44],
                  iconAnchor:   [20, 20],
              })
            }).bindPopup(feature.properties.CityName + ': ' + feature.properties.PersonalAnnualIncome);
          }
        }).addTo(map);
      });
    });


////ZOOM TO CHINA NATIONAL LEVEL//////
////NATIONAL CITIES////
$(document).ready(function() {
  $('#national').click(function(){
            $.ajax(dataset0).done(function(data) {
              var style = {color:"#E3DF27"};
              parsedData = JSON.parse(data);
              layerMappedMarkers = L.geoJson(parsedData,{
                pointToLayer: function (feature, latlng) {
                  link = 'https://en.wikipedia.org/wiki/' +feature.properties.CityName;
                  html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
                  var popuptext = feature.properties.CityName + html + "<p class = intro> or copy the link below</p>" + '    ' + link;
                  return L.circleMarker(latlng,style)
                    .bindPopup(popuptext);
                }
              }).addTo(map);
              map.fitBounds(layerMappedMarkers.getBounds(),{
                padding: [10,10]
              });
            });
          }
      );
});



//////ZOOM INTO BEIJING REAL ESTATE DATA//////
// ////BEIJING REAL ESTATE DATA////
$(document).ready(function() {
  $('#beijing').click(function(){
    $.ajax(dataset2).done(function(data) {
      parsedData2 = JSON.parse(data);
      layerMappedMarkers = L.geoJson(parsedData2,{
        pointToLayer: function (feature, latlng) {

          html = "<div><p class = intro> Here is it<a href = 'https://en.wikipedia.org/wiki/'> Go search it!</a></p></div>";
          var popuptext = feature.properties.name + html + "<p class = listing> This property was built in </p>" +feature.properties.yearbuilt+ "<p class = listing> The price per sq meter is </p>" + "RMB " +feature.properties.priceperm2;
          return new L.Marker(latlng, {
            // Specify which custom icon you want to use
            icon: myIcon
          }).bindPopup(popuptext).addEventListener("click",
            function(e){
              DestLon = feature.geometry.coordinates[0];
              DestLat = feature.geometry.coordinates[1];
              console.log(DestLon,DestLat);
          });
        }
      }).addTo(map);
      map.fitBounds(layerMappedMarkers.getBounds(),{
        padding: [10,10]
      });
      $('#national').click(function(){
        map.removeLayer(layerMappedMarkers);
      });
    });
  });
});


///2.2 SEARCH AND ADD SIMPLE ROUTE TO MAP
////SHOW THE SEARCH RESULT////
$(document).ready(function(){
  $('#Search').click(function(){
    newurl = url + $('#dest').val();
    console.log(newurl);
    $.ajax(newurl).done(function(data){
      console.log("downloaded");
      var parsedData4 = JSON.parse(JSON.stringify(data));
      console.log("parsed");
      featureGroup.push(L.geoJSON(parsedData4,{
      }).addTo(map));
      $('#national').click(function(){
        map.removeLayer(featureGroup);
      });
      OriginLat = data.features[0].geometry.coordinates[1];
      OriginLon = data.features[0].geometry.coordinates[0];
      console.log("added");
      });
    });
});

////SHOW THE OPTIMAL ROUTE////
//
$('#Route').click(function(){
  $(document).ready(function() {
    jsontoadd.locations.push({"lat":OriginLat,"lon":OriginLon},{"lat":DestLat,"lon":DestLon});
      console.log("points added");
      newurlsmproute = urlsmproute + JSON.stringify(jsontoadd);
      console.log(newurlsmproute);
      $.ajax(newurlsmproute).done(function(data){
        var string = data.trip.legs[0].shape;
        console.log("string");
        var decodedData = decode(string,6);
        console.log("decodedData");
        var linestring1 = turf.lineString(_.map(decodedData,function(data){
        return data.reverse();}));
        //CONVERT TO GEOJSON LINE//
        var lineStyle = {
          "color": "red",
          "weight": 3,
          "opacity":0.75,
          "dashArray": "8 8"
        };
        var Route = L.geoJSON(linestring1,{
          style:lineStyle
        }).addTo(map);
        $('#national').click(function(){
          map.removeLayer(Route);
        });
      });
    });
});



/////adding the provinces GDP SHARE map with different colors//////////
///switch statement can't work with comparison
// var myStyle1=function(feature){
//   var Share = feature.properties.aandeel_in_bbp_china_____2011_;
//   var Number = parseFloat(Share);
//   console.log(Number);
// ////you need to turn this into a number first//// now string
// ///you can only use one side comparison!///
//   if (Number<3.0){
//     return{color:"#486cd3"};
//   }else if(3.0<Number && Number<5.0){
//     return{color:"#48d3af"};
//   }else if(5.0<Number && Number<10.0){
//     return{color:"#e3e31d"};
//   }else if(10.0<Number){
//     return{color:"#e73115"};
//   }
//
//
// ///Try to use just string///this can work below!!!
//   // switch(Rate){
//   //   case "2.2":return{color:"#00FFFF"};
//   //   case "4.2":return{color:"#0000FF"};
//   //   case "10.3":return{color:"#FF7F50"};
//   //   case "11.2":return{color:"#006400"};
//   // }
//   // return {};
// };
// var myFilter1 = function(feature) {
//   if (feature.properties.aandeel_in_bbp_china_____2011_===' ') {
//   return false;
//   }
//   else {
//     return true;
//   }
// };



/////////////add maps of provinces with basic shapes////////////////////////


///////////default map///////////////////////////////////




///////////change to GDP SHARE///////////////////////////////////
//
// $('#GDPshare').on({
//   click:function(e){
//     $(document).ready(function() {
//       $.ajax(dataset3).done(function(data) {
//         parsedData3 = JSON.parse(data);
//         layerMappedPolygons = L.geoJson(parsedData3,
//           {
//             style: myStyle1,
//             filter: myFilter1,
//             pointToLayer: function (feature, latlngs) {
//               // console.log(feature.properties.CityName);
//               return new L.Polygon(latlngs, {
//               // Specify which custom icon you want to use
//             });
//           }
//         }).addTo(map).bindPopup("THIS");
//         console.log(parsedData);
//         });
//       });
//     }
// });

///////////change to GDP GROWTH RATE///////////////////////////////////
// $('#GDPrate').on({
//   click:function(e){
//     $(document).ready(function() {
//       $.ajax(dataset3).done(function(data) {
//         parsedData3 = JSON.parse(data);
//         layerMappedPolygons = L.geoJson(parsedData3,
//           {
//             style: myStyle2,
//             filter: myFilter2,
//             pointToLayer: function (feature, latlngs) {
//               // console.log(feature.properties.CityName);
//               return new L.Polygon(latlngs, {
//               // Specify which custom icon you want to use
//             });
//           }
//         }).addTo(map).bindPopup("THIS");
//         console.log(parsedData);
//         });
//       });
//     }
// });
