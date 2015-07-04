'use strict';

// Imports
var angular = require('angular');
var MenuCtrl  = require('./controllers/menuCtrl');

// Home sub-module definition
var menu = angular.module('app.menu', []);
menu.controller('MenuCtrl', [MenuCtrl]);

module.exports = menu;