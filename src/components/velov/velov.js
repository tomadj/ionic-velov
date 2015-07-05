'use strict';

// Imports
var angular = require('angular');
var MapsCtrl  = require('./controllers/mapsCtrl');
var ListCtrl = require('./controllers/listCtrl');
var mapDirective  = require('./directives/map');
var VelovService = require('./services/velovService')


// Velov sub-module definition
var velov = angular.module('app.velov', []);
velov.service('VelovService',['$http', VelovService]);
velov.controller('MapsCtrl', ['$ionicLoading','VelovService','$cordovaGeolocation','$state', MapsCtrl]);
velov.controller('ListCtrl', ['$ionicLoading','VelovService','$scope','$cordovaGeolocation', ListCtrl]);
velov.directive('map', [mapDirective]);

module.exports = velov;