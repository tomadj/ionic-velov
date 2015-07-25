'use strict';

var _ = require('lodash');
var _$ionicLoading;
var _VelovService;

// Maps controller class
function ListCtrl($ionicLoading, VelovService, $scope) {
	_$ionicLoading = $ionicLoading;
	_VelovService = VelovService;

	this.position = {};
	this.scope = $scope;
	this.getData();
}

/**
 * get data velov
 */
ListCtrl.prototype.getData = function () {
	var self = this;
	_$ionicLoading.show();

	_VelovService.getCurrentPosition().then(function (pos) {
		self.position = pos;
		_VelovService.getData().then(function (stations) {
			self.data = self.sortByDistance(self.position, stations);
			_$ionicLoading.hide();
		});
	});

};

ListCtrl.prototype.sortByDistance = function (position, list) {
	list.forEach(function (station) {
		var loc = new google.maps.LatLng(station.latitude, station.longitude);
		var myLoc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		var distance = google.maps.geometry.spherical.computeDistanceBetween(myLoc, loc);
		station.distance = distance;
	}, this);

	return _.sortBy(list, 'distance');
};

/**
 * pull to refresh
 */
ListCtrl.prototype.refresh = function (showLoading) {
	var self = this;

	if (showLoading) {
		_$ionicLoading.show();
	}

	_VelovService.getCurrentPosition().then(function (pos) {
		self.position = pos;
		_VelovService.getData().then(function (stations) {
			self.data = self.sortByDistance(self.position, stations);
			if (showLoading) {
				_$ionicLoading.hide();
			}
			else {
				self.scope.$broadcast('scroll.refreshComplete');
			}
		});
	});
};

module.exports = ListCtrl;