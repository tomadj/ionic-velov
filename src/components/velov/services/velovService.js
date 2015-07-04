'use strict';

// privates
var _$http;
// Velov service class
function VelovService($http) {

    _$http = $http;
    
}

/**
* getData
* @return {[type]}
*/
VelovService.prototype.getData = function () {
    var url = 'https://download.data.grandlyon.com/ws/rdata/jcd_jcdecaux.jcdvelov/all.json';
    return _$http.get(url);

}

module.exports = VelovService;