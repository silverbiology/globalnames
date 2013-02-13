var fs = require('fs');
var globalnames = require('../index');
var gna = new globalnames();

var ocrTxt1 = 'LICHENS OF FLORIDA, U.S.A.\n\nArthopyrenia cinchonae (Ach.) Mull. Arg. \non Quercus\n\nLevy County: Cedar Key Scrub State Preserve, \n along Co. Rd. 347 ca. 1.5 mi N of jct of \n Fla. Hwy 24, 29°12\'N, 83°01\'W; dry oak-\n ericad scrub with low swampy areas.\n\n30 November 1992\n\nRichard C. Williams 29352\n';

var ocrTxt1 = fs.readFileSync('G:\\wamp\\www\\cfla\\sample\\sample_ent\\ent\\gold\\ocr\\EMEC609683_Cerceris_conifrons.txt','utf8');
var ocrTxt1 = fs.readFileSync('G:\\wamp\\www\\cfla\\sample\\sample_ent\\ent\\gold\\ocr\\EMEC609589_Cerceris_compacta.txt','utf8');

// var ocrTxt1 = 'Cerceris {male}\r\n conifrons Mick.';
// var ocrTxt1 = 'Cerceris \r\n conifrons Mick.';
// var ocrTxt1 = 'Cerceris \n conifrons Mick.';

gna.setOcr( ocrTxt1 );

console.log("OCR:", gna.getOcr() );
console.log('-------------------------------');

gna.findNames(function( results ) {
	console.log(results);
	console.log('-------------------------------');
	console.log( gna.getNames() );
});
