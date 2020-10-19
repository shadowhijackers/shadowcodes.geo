
const mymap = L.map('mapid').setView([13.0685, 80.2484], 13); // default view to chennai

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox/streets-v11',
	tileSize: 512,
	zoomOffset: -1
}).addTo(mymap);


let popup = L.popup();
let marker = {};

function onMapClick(e) {
	clearExistingMarker();
	popup
		.setLatLng(e.latlng)
		.setContent(""+encodeLatLngToWords(e.latlng)+"")
		.openOn(mymap);
}

mymap.on('click', onMapClick);

function decodeWord() {
  const wordsInputEl = document.getElementById('words');
  const latlng = decodeWordsToLatLng(wordsInputEl.value);

	clearExistingMarker();

	marker = L.marker([+latlng.lat, +latlng.lng]).addTo(mymap)
		.bindPopup("<b>Results</b><br />" + latlng.lat + ","+ latlng.lng).openPopup();
}


function  clearExistingMarker() {
	if (marker !== undefined) {
		mymap.removeLayer(marker);
	}
}
