var globalnames = function( ocrTxt ) {

	var needle = require('needle');
	var route = "http://gnrd.globalnames.org/name_finder.json";
	var me = this;
	this.ocr = ocrTxt || null;
	this.lastResults = null;

	this.setOcr = function( ocrTxt ) {
		me.ocr = ocrTxt;
	}

	this.getOcr = function( row ) {
		if ( row && me.ocr[row] ) return me.ocr.split("\n")[row];
		return me.ocr;
	}

	// Uses lucene name finder service
	this.findNames = function( callback ) {
		var input = encodeURIComponent( this.ocr );
		var type = "text";
		var req = route + "?text=" + input;
		console.log(req);
		needle.get(req, function(error, response, body){
		console.log(response.statusCode);
			if (response.statusCode == 200) {
			console.log(body);
				me.lastResults = body.names;
				if (callback) callback( body.names );
			} else {
				// error
			}
		}, this);	
	}
	
	// Returns just an array of scientific names
	this.getNames = function( limit ) {
		var tmpList = [];
		if (this.lastResults) {
			// Use limit else return all
			var cnt = limit || this.lastResults.length;
			for(var i=0; i<cnt; i++) {
				tmpList.push( this.lastResults[i].scientificName );
			}
		}
		return tmpList;
	}
};

module.exports = globalnames;