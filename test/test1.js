var globalnames = require('../index');
var gna = new globalnames();

var ocrTxt1 = 'LICHENS OF FLORIDA, U.S.A.\n\nArthopyrenia cinchonae (Ach.) Mull. Arg. \non Quercus\n\nLevy County: Cedar Key Scrub State Preserve, \n along Co. Rd. 347 ca. 1.5 mi N of jct of \n Fla. Hwy 24, 29�12\'N, 83�01\'W; dry oak-\n ericad scrub with low swampy areas.\n\n30 November 1992\n\nRichard C. Williams 29352\n';

// var ocrTxt1 = 'Arthopyrenia cinchonae (Ach.) Mull. Arg. \non Quercus\n\nLevy ';

gna.setOcr( ocrTxt1 );

// console.log("OCR:", gna.getOcr() );

// gna.findNames(function( results ) {
	// console.log(results);
	// console.log('-------------------------------');
	// console.log( gna.getNames() );
// });



// [ 'Arthopyrenia cinchonae', 'Quercus' ]

// gna.resolveName('Arthopyrenia cinchonae', function( results ) {
	// console.log(results);
	// console.log('-------------------------------');
	// console.log( gna.getResolvedNames() );
// });


gna.searchNames('anar*',1,5, function( results ) {
	console.log(results);
	console.log('-------------------------------');
	console.log( gna.getSearchedNames() );
});
