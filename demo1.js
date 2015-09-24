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

var rgbLayer = "https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret,
    ndviLayer = "https://tile-{s}.urthecast.com/v1/ndvi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret,
    ndwiLayer = "https://tile-{s}.urthecast.com/v1/ndwi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret,
    fcnirLayer = "https://tile-{s}.urthecast.com/v1/false-color-nir/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret,
    eviLayer = "https://tile-{s}.urthecast.com/v1/evi/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret;
    
// Append them to the map
addLayer(L.tileLayer(rgbLayer).addTo(map), 'RGB', 1);
addLayer(L.tileLayer(ndviLayer).addTo(map), 'NDVI', 2);
addLayer(L.tileLayer(ndwiLayer).addTo(map), 'NDWI', 3);
addLayer(L.tileLayer(fcnirLayer).addTo(map), 'False Color NIR', 4);
addLayer(L.tileLayer(eviLayer).addTo(map), 'EVI', 5);

addBounce(map)

function addBounce(map){
    var markerLayer = new L.featureGroup();

    map.addLayer(markerLayer);

    map.on('click', function(e) {

        markerLayer.clearLayers();

        var lat = e.latlng.lat;
        var lng =e.latlng.lng;

        center = [lat, lng];

        map.setView(center, 10);

        marker = new L.Marker([lat, lng], {bounceOnAdd: true}).addTo(map);
        markerLayer.addLayer(marker);
        
        marker.on('click', function () {
            marker.bounce({duration: 500, height: 100});

        });
    });
}

// From https://www.mapbox.com/mapbox.js/example/v1.0.0/layers/
function addLayer(layer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);

    // Create a simple layer switcher that
    // toggles layers on and off.
    var link = document.createElement('a');
        link.href = '#';
        link.className = 'active';
        link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            this.className = '';
        } else {
            map.addLayer(layer);
            this.className = 'active';
        }
    };
    
    var layers = document.getElementById('menu-ui');

    layers.appendChild(link);
}


