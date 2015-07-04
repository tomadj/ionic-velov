'use strict';

// Imports
var angular = require('angular');
var AboutCtrl  = require('./controllers/aboutCtrl');

// Home sub-module definition
var about = angular.module('app.about', []);
about.controller('AboutCtrl', [AboutCtrl]);

module.exports = about;