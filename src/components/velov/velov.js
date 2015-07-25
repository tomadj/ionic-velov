'use strict';

// Imports
var angular = require('angular');
var MapsCtrl  = require('./controllers/mapsCtrl');
var ListCtrl = require('./controllers/listCtrl');
// var mapDirective  = require('./directives/map');
var VelovService = require('./services/velovService');
window._ = require('lodash');
require('angular-google-maps');

// Velov sub-module definition
var velov = angular.module('app.velov', ['uiGmapgoogle-maps']);
velov.service('VelovService',['$http','$cordovaGeolocation','$q', VelovService]);
velov.controller('MapsCtrl', ['$ionicLoading','VelovService','$state', MapsCtrl]);
velov.controller('ListCtrl', ['$ionicLoading','VelovService','$scope', ListCtrl]);
// velov.directive('map', [mapDirective]);

module.exports = velov;