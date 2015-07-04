'use strict';

var _$ionicLoading;
var _VelovService;

// Maps controller class
function ListCtrl($ionicLoading, VelovService) {
	var self = this;
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

module.exports = ListCtrl;