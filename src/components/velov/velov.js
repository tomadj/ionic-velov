'use strict';

// Imports
var angular = require('angular');
var MapsCtrl  = require('./controllers/mapsCtrl');
var ListCtrl = require('./controllers/listCtrl');
// var mapDirective  = require('./directives/map');
var VelovService = require('./services/velovService');
window._ = require('lodash');
require('../../../bower_components/angular-google-maps/dist/angular-google-maps');

// Velov sub-module definition
var velov = angular.module('app.velov', ['uiGmapgoogle-maps']);
velov.service('VelovService',['$http', VelovService]);
velov.controller('MapsCtrl', ['$ionicLoading','VelovService','$cordovaGeolocation','$state', MapsCtrl]);
velov.controller('ListCtrl', ['$ionicLoading','VelovService','$scope','$cordovaGeolocation', ListCtrl]);
// velov.directive('map', [mapDirective]);

module.exports = velov;