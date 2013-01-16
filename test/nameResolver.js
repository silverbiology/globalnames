var globalnames = require('../index');
var gna = new globalnames();

// [ 'Arthopyrenia cinchonae', 'Quercus' ]

gna.resolveName('Arthopyrenia cinchonae', function( results ) {
	console.log(results);
	console.log('-------------------------------');
	console.log( gna.getResolvedNames() );
});
