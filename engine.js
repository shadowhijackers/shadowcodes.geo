
const SEPERATOR = '-';
const DECIMAL_LENTH = 4; // 11 meters distance

// 13.0685
// 80.2484
// 13 0685 80 2484
// logB1000 (130685802484) 1 130 685 802 484
// 4
// 130685802484 % 1000  =484; 130685802 % 1000 =802, 130685 % 1000 =685,  =130
// 484 apple, 802 banana, 685 mango, 130 orange
function encodeLatLngToWords(latlng) {
	let tmpLat = latlng.lat.toFixed(DECIMAL_LENTH).split('.');
	let tmpLng = latlng.lng.toFixed(DECIMAL_LENTH).split('.');
	let lat = convertLat(tmpLat);
	let lng = convertLng(tmpLng);

	let latlngInNumber = converLatLngToNumber(lat, lng);
	let wordsCount = noOfWords(latlngInNumber);
	let wordsList = getWordsList(latlngInNumber, wordsCount);

	return wordsList.join(SEPERATOR);
}

// 484 apple, 802 banana, 685 mango, 130 orange
// 130 685 802 484 = 1000P3*130 + 1000P2*685 + 1000P1*802 + 1000P0*484
// 2 484
// 130 685 80
// 80 > 180 => 80 - 360
// 130 685
// 130 > 90 => 13 - 180
// 13 0685, 80 2484
function decodeWordsToLatLng(wordsList) {
	const latlng = {lat: 0.0, lng: 0.0};
	const wordIndexes = getWordsIndexes(wordsList);
	let latLngNos = convertWordIndexesToNumber(wordIndexes);

	const {tmpLng, tmpLatLngNos} = convertLngFromWordsIndexes(latLngNos.toString(), wordsList);
	latlng.lng = tmpLng;
	latLngNos = tmpLatLngNos;
	latlng.lat = convertLatFromWordsIndexes(latLngNos);

	return latlng;
}

function convertLat(lat) {
	if (lat[0] < 0) {
		lat[0] = 180 - (-1 * lat[0]);
	}

	return lat;
}

function convertLng(lng) {
	if (lng[0] < 0) {
		lng[0] = 360 + (-1 * lng[0]);
	}

	return lng;
}

function converLatLngToNumber(lat, lng) {
	return lat.join('') + lng.join('');
}

function noOfWords(latlng) {
	return Math.ceil(Math.log(latlng) / Math.log(WORDS_DB.length));
}

function getWordsList(latlngInNumber, noOfWords) {
	let words = [];
	let e = 0;
	let divedNo = latlngInNumber;
	while (e < noOfWords) {
		let wordIndex = divedNo % WORDS_DB.length;
		divedNo = +(divedNo / WORDS_DB.length).toString().split('.')[0];
		words.push(WORDS_DB[Math.abs(wordIndex)]);
		e++;
	}

	return words;
}

function getWordsIndexes(wordsList) {
	return wordsList.split('-').map(word=>WORDS_DB.indexOf(word));
}

function convertWordIndexesToNumber(wordIndexes) {
	let latLngNo = 0;
	let i = 0;

	while (i < wordIndexes.length) {
		latLngNo += Math.pow(WORDS_DB.length, i) * wordIndexes[i];
		i++;
	}

	return latLngNo;
}

function convertLngFromWordsIndexes(latLngNos, wordsList) {
	let lng = 0.0;

	const lngMintSec = latLngNos.substring(latLngNos.length - DECIMAL_LENTH, latLngNos.length);
	latLngNos = latLngNos.substring(0, latLngNos.length - DECIMAL_LENTH);

	const dirtyLng = +latLngNos.substring(latLngNos.length - 2, latLngNos.length);
	if (dirtyLng > 180) {
		lng = [latLngNos.substring(latLngNos.length - 3, latLngNos.length) - 360, lngMintSec].join('.');
		latLngNos = latLngNos.substring(0, latLngNos.length - wordsList.length - 3)
	} else {
		lng = [latLngNos.substring(latLngNos.length - 2, latLngNos.length), lngMintSec].join('.');
		latLngNos = latLngNos.substring(0, latLngNos.length - 2);
	}

	return {tmpLng: lng, tmpLatLngNos: latLngNos}
}

function convertLatFromWordsIndexes(latLngNos) {
	let lat = 0.0;
	let latMinSec = latLngNos.substring(latLngNos.length - DECIMAL_LENTH, latLngNos.length);
	latLngNos = +latLngNos.substring(0, latLngNos.length - DECIMAL_LENTH);

	if (latLngNos > 90) {
		lat = [latLngNos - 180, latMinSec].join('.');
	} else {
		lat = [latLngNos, latMinSec].join('.');
	}

	return lat;
}
