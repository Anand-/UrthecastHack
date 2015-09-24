// Get the user's API key via prompt
if (!localStorage.getItem('uc_api_key')) {
    localStorage.setItem(
    	'uc_api_key', 
        prompt('What is your UC API key?')
    );
}

// Get the user's API secret via prompt
if (!localStorage.getItem('uc_api_secret')) {
    localStorage.setItem(
        'uc_api_secret', 
		prompt('What is your UC API secret?')
    );
}

// Confirm we've got 'em by displaying them to the screen
var apiKey = localStorage.getItem('uc_api_key'),
    apiSecret = localStorage.getItem('uc_api_secret');

// Create a Leaflet map
var map = L.map('map').setView([
    37.78684346730307,
    -122.40559101104735
], 9);

// Create a simple UC tile layer - global map, no restrictions
var url = "https://tile-{s}.urthecast.com/v1/rgb/{z}/{x}/{y}?api_key="+apiKey+"&api_secret="+apiSecret;

// Append it to the map
var ucTiles = L.tileLayer(url).addTo(map);

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