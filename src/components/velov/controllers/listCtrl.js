'use strict';

var _$ionicLoading;
var _VelovService;
var _ = require('lodash');

// Maps controller class
function ListCtrl($ionicLoading, VelovService, $scope) {
	var self = this;
	self.scope = $scope;
	_$ionicLoading = $ionicLoading;
	_VelovService = VelovService;

	self.getData();
}

/**
 * get data velov
 */
ListCtrl.prototype.getData = function () {
	var self = this;
	_$ionicLoading.show();


	var isWebView = ionic.Platform.isWebView();
	if (isWebView) {

		var posOptions = { timeout: 10000, enableHighAccuracy: false };
		_$cordovaGeolocation.getCurrentPosition(posOptions).then(function (pos) {
			console.log('Got pos', pos);
			self.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

			_VelovService.getData().success(function (result) {
				self.data = self.sortByDistance(self.position, result.values);
				_$ionicLoading.hide();
			});

		}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
	}
	else {
		navigator.geolocation.getCurrentPosition(function (pos) {

			self.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			_VelovService.getData().success(function (result) {
				self.data = self.sortByDistance(self.position, result.values);
				_$ionicLoading.hide();
			});

		}, function (error) {
				alert('Unable to get location: ' + error.message);
			});
	}
};


ListCtrl.prototype.sortByDistance = function (position, list) {
	list.forEach(function (station) {
		var stationLocation = new google.maps.LatLng(station[8], station[9]);
		var distance =  google.maps.geometry.spherical.computeDistanceBetween(position, stationLocation);
		station[20] = distance;
	}, this);

	return _.sortBy(list, 20);
};

/**
 * pull to refresh
 */
ListCtrl.prototype.refresh = function () {
	var self = this;
	_VelovService.getData().success(function (result) {
		self.data = result.values;
		self.scope.$broadcast('scroll.refreshComplete');
	});
};

module.exports = ListCtrl;