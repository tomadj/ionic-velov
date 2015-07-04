'use strict';

// Imports
var angular = require('angular');
var MapsCtrl  = require('./controllers/mapsCtrl');
var mapDirective  = require('./directives/map');
var VelovService = require('./services/velovService')

// Home sub-module definition
var maps = angular.module('app.maps', []);
maps.service('VelovService',['$http', VelovService]);
maps.controller('MapsCtrl', ['$ionicLoading','VelovService', MapsCtrl]);
maps.directive('map', [mapDirective]);

module.exports = maps;