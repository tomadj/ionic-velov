'use strict';

var _$ionicLoading;
var _VelovService;
var _ = require('lodash');

// Maps controller class
function MapsCtrl($ionicLoading, VelovService,$state) {
	_$ionicLoading = $ionicLoading;
	_VelovService = VelovService;
	
	this.stationId = $state.params.stationId;
	this.stations = [];
	this.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	
	this.getMarkers();
}

/**
 * map created event
 */
MapsCtrl.prototype.getMarkers = function (cb) {
	_VelovService.getData().then(function (result) {
		this.stations = result;
		
		if(this.stationId)
		{
		 	this.centerOnStation(this.stationId);	 
		}
		else {
			this.center();
		}
	}.bind(this));
};

MapsCtrl.prototype.center = function(stationId){
	console.log('on me');
	_$ionicLoading.show({
		content: 'Getting current location...',
		showBackdrop: false
    });
	
	if(stationId){
		this.map = { center: { latitude: station.latitude, longitude: station.longitude }, zoom: 14 };
	}else{
		_VelovService.getCurrentPosition().then(function(pos){
			_$ionicLoading.hide();
			this.map = { center: { latitude: pos.coords.latitude, longitude: pos.coords.longitude }, zoom: 14 };
		}.bind(this));
	}
	
};

/**
 * Centering on current station
 */
MapsCtrl.prototype.centerOnStation = function (stationId) {
	console.log(stationId);
	var station = _.findWhere(this.stations, { idkey: stationId});
	this.map = { center: { latitude: station.latitude, longitude: station.longitude }, zoom: 17 };
};

/**
 * handle marker click
 */
MapsCtrl.prototype.onMarkerClick = function (gmarker, event, marker){

};

module.exports = MapsCtrl;