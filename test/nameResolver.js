var globalnames = require('../index');
var gna = new globalnames();

// [ 'Arthopyrenia cinchonae', 'Quercus' ]

// gna.resolveName('Arthopyrenia cinchonae', function( results ) {
// gna.resolveName('Cortinarius aurichalceus', function( results ) {
gna.resolveName('Cortinarius balteatus', function( results ) {
	console.log(results);
	console.log('-------------------------------');
	console.log( gna.getResolvedNames() );
});
