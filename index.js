var globalnames = function( ocrTxt ) {

	this.needle = require('needle');
	
	var me = this;
	this.nameFinder = new globalNamesNameFinder( me );
	this.resolver = new globalNamesResolver( me );
	this.nameSearch = new globalNamesNameSearch( me );

	this.ocr = ocrTxt || null;

	this.setOcr = function( ocrTxt ) {
		me.ocr = ocrTxt;
	}

	this.getOcr = function( row ) {
		if ( row && me.ocr[row] ) return me.ocr.split("\n")[row];
		return me.ocr;
	}

	this.findNames = function(callback) {
		me.nameFinder.findNames(function(results) {
			if (callback) callback(results);
		});
	}

	this.getNames = function() {
		return me.nameFinder.getNames();
	}

	this.resolveName = function(name, callback) {
		me.resolver.resolveName(name, function(results) {
			if (callback) callback(results);
		});
	}

	this.getResolvedNames = function() {
		return me.resolver.getResolvedNames();
	}

	this.searchNames = function(name,searchFormat,page, perpage,callback) {
		me.nameSearch.searchNames(name,searchFormat,page, perpage,function(results) {
			if (callback) return callback(results);
		});
	}

	this.getSearchedNames = function() {
		return me.nameSearch.getSearchedNames();
	}
	
	this.parseNames = function(name,callback) {
		me.nameSearch.parseNames(name,function(results) {
			if (callback) return callback(results);
		});
	}
	
	this.nameDetails = function(id,callback) {
		me.nameSearch.nameDetails(id,function(results) {
			if (callback) return callback(results);
		});
	}
	
};

//==============================
// globalNamesNameFinder Library
//==============================
var globalNamesNameFinder = function( parent ) {
	
	var route = "http://gnrd.globalnames.org/name_finder.json";
	var me = this;
	this.async = require('async');
	
	var pollingFunction = function(url, callback) {
		var i = 0;
		var names = null;
		me.async.doUntil(function(cb) {
			parent.needle.get(url, function(error, response, body) {
				if (body && body.status == 200) {
					names = body.names;
					i = 99999;
					cb();
				} else {
					i++;
					setTimeout(cb, 2000);
				}
			});
		}, function() {
			return (i > 20);
		}, function() {
			callback(names);
		});
	}
	
	this.findNames = function( callback ) {
		var input = encodeURIComponent( parent.ocr );
		var type = "text";
		var req = route + "?" + type + "=" + input;
		parent.needle.get(req, function(error, response, body){
			if (response) {
				if (response.statusCode == 303 && 'undefined' != typeof response.headers.location) {
					pollingFunction(response.headers.location, function(names){
						if (callback) callback(names);
					});
				} else {
					console.log("??? Fix");
					if (callback) callback(false);
				}
			} else {
				console.log("??? Fix");
				if (callback) callback(false);
			}
		}, this);	
	}

	// Returns just an array of scientific names
	this.getNames = function( limit ) {
		var tmpList = [];
		if (this.names) {
			// Use limit else return all
			var cnt = limit || this.names.length;
			for (var i=0; i<cnt; i++) {
				tmpList.push( this.names[i].scientificName );
			}
		}
		return tmpList;
	}
}

//==============================
// globalNamesResolver Library
//==============================
var globalNamesResolver = function( parent ) {
	var route = "http://resolver.globalnames.org/name_resolvers.json";
	var me = this;
	var counter = 0;
	this.names = null;
	
	this.resolveName = function( name, callback ) {
		var input = encodeURIComponent( name );
		var type = "names";
		var req = route + "?" + type + "=" + input;
		// console.log(req);
		parent.needle.get(req, function(error, response, body) {
			console.log("Finish Resolve", error, body.data);
			if (body && body.status == 'success') {
				if (typeof body.data == 'undefined' || typeof body.data[0].results == 'undefined') {
					callback(false);
				} else {
					me.names = body.data[0].results;
					callback(me.names);
				}
			} else {
				callback(false);
			}
		}
		, this);	
	}
	
	this.getResolvedNames = function( limit ) {
		var tmpList = [];
		if (this.names) {
			// Use limit else return all
			var cnt = limit || this.names.length;
			for (var i=0; i<cnt; i++) {
				tmpList.push( this.names[i].canonical_form );
			}
		}
		return tmpList;
	}
	
}

//==============================
// globalNamesNameSearch Library
//==============================
var globalNamesNameSearch = function( parent ) {
	var route = "http://gni.globalnames.org/name_strings.json";
	var parseRoute = "http://gni.globalnames.org/parsers.json";
	var nameRoute = "http://gni.globalnames.org/name_strings/";
	var me = this;
	var counter = 0;
	this.names = null;
	this.parsedNames = null;
	this.nameDetails = null;
	
	this.searchNames = function( name, searchFormat, page, perpage, callback ) {
		searchFormat = searchFormat || '*';
		page = page || 1;
		perpage = perpage || 30;
		var format = {'*':'*','exact':'exact:','ns':'ns:','can':'can:','uni':'uni:','gen':'gen:','sp':'sp:','ssp':'ssp:','au':'au:','yr':'yr:'};
		var input = encodeURIComponent( name );
		if(searchFormat in format) {
			if(searchFormat == '*') {
				input = name+format[searchFormat];
			} else {
				input = format[searchFormat]+name;
			}
		}
		var type = "search_term";
		var req = route + "?" + type + "=" + input + "&per_page=" + perpage + "&page=" + page;
		parent.needle.get(req, function(error, response, body){
			me.names = body;
			callback(me.names);
		}
		, this);	
	}
	
	this.getSearchedNames = function( limit ) {
		var tmpList = [];
		if (this.names.name_strings) {
			// Use limit else return all
			var cnt = limit || this.names.name_strings.length;
			for (var i=0; i<cnt; i++) {
				tmpList.push( this.names.name_strings[i].name );
			}
		}
		return tmpList;
	}
	
	this.parseNames = function( name, callback ) {
		var input = encodeURIComponent( name );
		var type = "names";
		var req = parseRoute + "?" + type + "=" + input;
		
		parent.needle.get(req, function(error, response, body){
			me.parsedNames = body;
			callback(me.parsedNames);
		}
		, this);	
	}
	
	this.nameDetails = function( id, callback ) {
		if (id) {
			var input = id;
			var req = nameRoute + input + ".json?all_records=false";
			
			parent.needle.get(req, function(error, response, body){
				me.nameDetails = body;
				callback(me.nameDetails);
			}
			, this);	
		} else {
			callback(false);
		}
	}
}

module.exports = globalnames;