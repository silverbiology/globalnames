var globalnames = require('../index');
var gna = new globalnames();

// gna.searchNames('anar','*',1,5, function( results ) {
	// console.log(results);
	// console.log('-------------------------------');
	// console.log( gna.getSearchedNames() );
// });

gna.searchNames('major','ssp',1,3, function( results ) {
	console.log(results);
	console.log('-------------------------------');
	console.log( gna.getSearchedNames() );
});
