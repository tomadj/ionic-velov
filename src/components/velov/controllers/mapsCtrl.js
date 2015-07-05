'use strict';

var _$ionicLoading;
var _VelovService;
var _$cordovaGeolocation;
var _ = require('lodash');

// Maps controller class
function MapsCtrl($ionicLoading, VelovService, $cordovaGeolocation,$state) {
	var self = this;
	this.map = null;
	
	_$ionicLoading = $ionicLoading;
	_$cordovaGeolocation = $cordovaGeolocation;
	_VelovService = VelovService;
	
	self.stationId = $state.params.stationId;
}

/**
 * map created event
 */
MapsCtrl.prototype.mapCreated = function (map) {
	var self = this;
	self.map = map;
	_VelovService.getData().success(function (result) {
		self.data = result.values;

		var marker, i;
		for (i = 0; i < self.data.length; i++) {

			var lat = self.data[i][8];
			var long = self.data[i][9];

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, long),
				map: self.map
			});

			var infowindow = new google.maps.InfoWindow();

			google.maps.event.addListener(marker, 'click',(function (marker, i) {
				return function () {
					var name = self.data[i][1];
					var availableBikes = self.data[i][13];
					var availableBikeStands = self.data[i][12];
					var content = '<h3>' + name + '</h3>';
					content += '<h4>Places : ' + availableBikeStands + '</h4>';
					content += '<h4>Velos : ' + availableBikes + '</h4>';
					infowindow.setContent(content);
					infowindow.open(self.map, marker);
				}
			})(marker, i));
		}
		marker.setMap(self.map);
		if(self.stationId)
		{
		 	self.centerOnStation(self.stationId);	
			 
		}
		else {
			self.centerOnMe();
		}
	});
};

/**
 * Centering on current position
 */
MapsCtrl.prototype.centerOnMe = function () {
	var self = this;

	console.log("Centering");
    if (!this.map) {
		return;
    }

    this.loading = _$ionicLoading.show({
		content: 'Getting current location...',
		showBackdrop: false
    });

	var isWebView = ionic.Platform.isWebView();
	if (isWebView) {

		var posOptions = { timeout: 10000, enableHighAccuracy: false };
		_$cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
			console.log('Got pos', pos);
			self.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			self.loading.hide();
		}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
	}
	else {
		navigator.geolocation.getCurrentPosition(function (pos) {
			console.log('Got pos', pos);
			self.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			self.loading.hide();
		}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
	}
};

/**
 * Centering on current station
 */
MapsCtrl.prototype.centerOnStation = function (stationId) {
	var self = this;

    if (!self.map) {
		return;
    }
	
	var station = _.findWhere(self.data, { 0: stationId});
	self.map.setCenter(new google.maps.LatLng(station[8], station[9]));
	self.map.setZoom(16);
	
};
module.exports = MapsCtrl;