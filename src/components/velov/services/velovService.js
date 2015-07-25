'use strict';

// privates
var _ = require('lodash');
var _$http;
var _$q;
var _$cordovaGeolocation;

// Velov service class
function VelovService($http,$cordovaGeolocation,$q) {
    _$http = $http;
    _$cordovaGeolocation = $cordovaGeolocation; 
	_$q = $q;
	
	this.data = [];
}

/**
* getData
* @return {[type]}
*/
VelovService.prototype.getData = function () {
	var deferred = _$q.defer();
    var url = 'https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json';
	
    _$http.get(url).then(function(result){
		this.data = _.map(result.data.values, function(item){
			return {
				idkey: item[0],
				name: item[1],
				availableBikes: item[13],
				availableBikeStands: item[12],
				latitude: item[8],
				longitude: item[9]	
			};
		});
		deferred.resolve(this.data);
	}.bind(this));
	
	return deferred.promise;
};

/**
 * get 
 */
VelovService.prototype.getCurrentPosition = function(){
    
	 var deferred = _$q.defer();
	
	if (ionic.Platform.isWebView()) {
		var posOptions = { timeout: 10000, enableHighAccuracy: false };
		_$cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
			deferred.resolve(pos);
		}, deferred.reject);
	}
	else {
		navigator.geolocation.getCurrentPosition(function (pos) {
			console.log('position fetched');
			deferred.resolve(pos);
		}, deferred.reject);
	}
	
	return deferred.promise;
};

module.exports = VelovService;