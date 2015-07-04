'use strict';

var _$ionicLoading;
var _VelovService;

// Maps controller class
function MapsCtrl($ionicLoading, VelovService) {
	var self = this;
	this.map = null;
	_$ionicLoading = $ionicLoading;
	_VelovService = VelovService;

	

}

/**
 * map created event
 */
MapsCtrl.prototype.mapCreated = function (map) {
	var self = this;
	self.map = map;
	_VelovService.getData().success(function (result) {
		var data = result.values;

		var marker, i;
		for (i = 0; i < data.length; i++) {
			
			var lat = data[i][8];
			var long = data[i][9];
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(lat, long),
				map: self.map
			});
			
			  var infowindow = new google.maps.InfoWindow();
			
			google.maps.event.addListener(marker, 'click',(function (marker, i) {
				return function () {
					infowindow.setContent('toto');
					infowindow.open(self.map, marker);
				}
			})(marker, i));
		}
			marker.setMap(self.map);
	});
};

/**
 * Centering command
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

    navigator.geolocation.getCurrentPosition(function (pos) {
		console.log('Got pos', pos);
		self.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		self.loading.hide();
    }, function (error) {
			alert('Unable to get location: ' + error.message);
		});
};

module.exports = MapsCtrl;