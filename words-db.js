const WORDS_DB = generateSampleWord();
Object.freeze(WORDS_DB);
console.log(WORDS_DB);


// for sample
function  generateSampleWord() {
	const pattern = '0123456789ABCDEFGHIJKL';
	const words = [];
	const count = 0;
	for(let i=0; i<pattern.length; i++){
		for(let j=0; j<pattern.length; j++){
			for(let k=0; k<pattern.length; k++){
        words.push(""+pattern[i]+pattern[j]+pattern[k]+"")
			}
		}
	}

	return words;
}
