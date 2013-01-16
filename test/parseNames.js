var globalnames = require('../index');
var gna = new globalnames();

gna.parseNames('Plantago minor',function( results ) {
	console.log(results);
});
