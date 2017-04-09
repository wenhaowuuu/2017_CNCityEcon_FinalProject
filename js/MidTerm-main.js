/* =====================
   You should NOT need to change this file (though you are not forbidden from doing so)
===================== */

/* =====================
  Call getAndParseData to grab our dataset through a jQuery.ajax call ($.ajax)
===================== */
//prepare the transformed data from csv

//claim the global variables:

var layerMappedMarkers;
var slideNumber = 0;
var parsedData;
var dataset = "https://raw.githubusercontent.com/wenhaowuuu/MidTermFinal/master/data/EconomicIndicator_Chinesecities.geojson";

//set up map
var map = L.map('map', {
  center: [32.9670, 117.5370],
  zoom: 5
});

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
    layerMappedMarkers = L.geoJson(parsedData).addTo(map);
    console.log(parsedData);
  });

  $('#next').click(function(){
    clickNextButton();
  });

  $('#previous').click(function(){
    clickPreviousButton();
  });
});
