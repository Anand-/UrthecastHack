// Get the user's API key via prompt
// if (!localStorage.getItem('uc_api_key')) {
//     localStorage.setItem(
//     	'uc_api_key', 
//         prompt('What is your UC API key?')
//     );
// }

// // Get the user's API secret via prompt
// if (!localStorage.getItem('uc_api_secret')) {
//     localStorage.setItem(
//         'uc_api_secret', 
// 		prompt('What is your UC API secret?')
//     );
// }

// Confirm we've got 'em by displaying them to the screen
//var apiKey = localStorage.getItem('uc_api_key'),
//    apiSecret = localStorage.getItem('uc_api_secret');
apiKey = "1D5F7B2B5D464C649320"
apiSecret = "847426A8A04C425BB377CE8BAC26F48D"

// Create a Leaflet map
var map = L.map('map').setView([
    37.78684346730307,
    -122.40559101104735
], 9);

// Create a simple UC tile layer - global map, no restrictions
// var url = "https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret;

// Append it to the map
//var ucTiles = L.tileLayer(url).addTo(map);

var filterType = 'rgb';
var sceneId = 'Fo4XzqtWQkaLO2jj-igVbA';

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

	var filterType = button.value;

	console.log(filterType);

	map.removeLayer(sceneLayer);

	sceneLayer = L.tileLayer("https://tile-{s}.urthecast.com/v1/"+filterType+"/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret+'&id=Fo4XzqtWQkaLO2jj-igVbA');

	map.addLayer(sceneLayer);

}

function playScenes(sceneData) {

    console.log(sceneData);

    for (var i=0; i < sceneData[0].length; i++) {
        console.log(sceneData[0][i]);
        console.log(sceneData[1][i]);
    }

}


function addBounce(map){
    var markerLayer = new L.featureGroup();

    map.addLayer(markerLayer);

    map.on('click', function(e) {

        markerLayer.clearLayers();

        var lat = e.latlng.lat;
        var lng =e.latlng.lng;

        center = [lat, lng];

        map.setView(center, map.getZoom());

        marker = new L.Marker([lat, lng], {bounceOnAdd: true}).addTo(map);
        markerLayer.addLayer(marker);

        var sceneData = getScenes(String(lat), String(lng), playScenes);

        
        marker.on('click', function () {
            marker.bounce({duration: 500, height: 100});
        });
    });
}


$('.filterButton').on('click', function() {

	switchLayer(this);
});






