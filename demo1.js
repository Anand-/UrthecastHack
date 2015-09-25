// Confirm we've got 'em by displaying them to the screen
//var apiKey = localStorage.getItem('uc_api_key'),
//    apiSecret = localStorage.getItem('uc_api_secret');
apiKey = "1D5F7B2B5D464C649320"
apiSecret = "847426A8A04C425BB377CE8BAC26F48D"

// Create a Leaflet map
var map = L.map('map').setView([
    37.78684346730307,
    -122.40559101104735
], 12);

// Create a simple UC tile layer - global map, no restrictions
// var url = "https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret;

// Append it to the map
//var ucTiles = L.tileLayer(url).addTo(map);

var filterType = 'rgb';
var sceneId = 'Fo4XzqtWQkaLO2jj-igVbA';

var locationName = '';

var baseLayer = new L.tileLayer("https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret);
var sceneLayer = new L.tileLayer("https://tile-{s}.urthecast.com/v1/"+filterType+"/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret+'&id='+sceneId);
// var ndviLayer = new L.tileLayer("https://tile-{s}.urthecast.com/v1/ndvi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret);
// var ndwiLayer = new L.tileLayer("https://tile-{s}.urthecast.com/v1/ndwi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret);
    // fcnirLayer = "https://tile-{s}.urthecast.com/v1/false-color-nir/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret,
    // eviLayer = "https://tile-{s}.urthecast.com/v1/evi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret;
 
map.addLayer(baseLayer);   
map.addLayer(sceneLayer);
addBounce(map);



function switchLayer(button) {

	filterType = button.value;

	console.log(filterType);

	map.removeLayer(sceneLayer);

	sceneLayer = L.tileLayer("https://tile-{s}.urthecast.com/v1/"+filterType+"/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret+'&id='+sceneId);

	map.addLayer(sceneLayer);

}

function updateScene(newSceneId) {

    sceneId = newSceneId;

    map.removeLayer(sceneLayer);

    sceneLayer = L.tileLayer("https://tile-{s}.urthecast.com/v1/"+filterType+"/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret+'&id='+sceneId);

    map.addLayer(sceneLayer);
}

var playScenesCounter = 0;
var updatedSceneData = '';

var playScenesFlag = false;


function playScenes(sceneData) {

    setTimeout(function () {  

    if (playScenesFlag === true) {  
            
        updateScene(sceneData[1][playScenesCounter]);

        playScenesCounter++;

          if (playScenesCounter < sceneData[0].length) {

            $('#overlay').html(locationName + " on " + sceneData[0][playScenesCounter]);           
             playScenes(sceneData);         
          }

          else if (playScenesCounter == sceneData[0].length) {
            playScenesCounter = 0;
            playScenes(sceneData);
          }                       
       }
    }, 3000);
}

function updateSceneData(sceneData) {

    updatedSceneData = sceneData;
}


function addBounce(map){
    var markerLayer = new L.featureGroup();

    map.addLayer(markerLayer);

    map.on('click', function(e) {

        playScenesCounter = 0;

        markerLayer.clearLayers();

        var lat = e.latlng.lat;
        var lng =e.latlng.lng;

        center = [lat, lng];

        console.log(center);

        map.setView(center, map.getZoom());

        marker = new L.Marker([lat, lng], {bounceOnAdd: true}).addTo(map);
        markerLayer.addLayer(marker);

        var sceneData = getScenes(String(lat), String(lng), updateSceneData);

        getLocationName(lat, lng);
        
        marker.on('click', function () {
            marker.bounce({duration: 500, height: 100});
        });
    });
}


$('.filterButton').on('click', function() {

    $('.filterButton').css({'background': '#ffffff', 'color': '#222222'});

    $(this).css({'background': '#222222', 'color': '#ffffff'});

    playScenesCounter = 0;

	switchLayer(this);

});

function getLocationName(lat, lng) {
    var url2 = "http://photon.komoot.de/reverse?lon="+lng+"8&lat="+lat;
    var xmlhttp2 = new XMLHttpRequest();

       xmlhttp2.open("GET", url2, true);
       xmlhttp2.send();

       xmlhttp2.onreadystatechange = function() {
       if (xmlhttp2.readyState == 4 &&
              xmlhttp2.status == 200) {

              var resp = JSON.parse(xmlhttp2.responseText);
                 //myArr2 = resp.payload
              //console.log(myArr2);

              console.log(resp);
              console.log(resp.features[0].properties.city);

              locationName = resp.features[0].properties.city;
              $('#overlay').html(locationName);
              //console.log(myArr2[1].owner_scene_id);
              //console.log(myArr2.length);

              /*for(i = 0; i < myArr2.length; i++) {
                  scene_ids[i] = (myArr2[i].acquired.substring(0,10));
                  time_stamps[i] = (myArr2[i].owner_scene_id);
              }
              var scene_properties = [time_stamps,scene_ids];
              console.log(scene_properties);
              console.log(scene_ids);
              console.log(time_stamps);*/
              }}
}


$('#playScenes').on('click', function() {

    if (playScenesFlag === false) {

        playScenesFlag = true;

        playScenes(updatedSceneData);

        $('#playScenes').html('pause');

    }

    else if (playScenesFlag === true) {

        playScenesFlag = false;

        $('#playScenes').html('play');
    }
});





