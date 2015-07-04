'use strict';

var _$ionicLoading;
var _VelovService;

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
	_VelovService.getData().success(function (result) {
		self.data = result.values;
		_$ionicLoading.hide();
	});
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