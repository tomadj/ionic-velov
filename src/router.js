'use strict';

/**
 * Router class
 */
function Router($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'components/menu/controllers/menu.html',
    controller: 'MenuCtrl as vm'
  })

    .state('app.map', {
    url: '/map/:stationId',
    views: {
      'menuContent': {
        templateUrl: 'components/velov/controllers/maps.html',
        controller: 'MapsCtrl as vm'
      }
    }
  })

    .state('app.list', {
    url: '/list',
    views: {
      'menuContent': {
        templateUrl: 'components/velov/controllers/list.html',
        controller: 'ListCtrl as vm'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/list');
}

module.exports = Router;