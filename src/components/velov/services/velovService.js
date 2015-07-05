'use strict';

// privates
var _$http;
//var _$cordovaGeolocation;

// Velov service class
function VelovService($http) {
    _$http = $http;
    //_$cordovaGeolocation = $cordovaGeolocation;  
}

/**
* getData
* @return {[type]}
*/
VelovService.prototype.getData = function () {
    var url = 'https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json';
    return _$http.get(url);

};

VelovService.prototype.getMyLocation = function(){
    //todo
};

module.exports = VelovService;