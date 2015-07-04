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
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'components/maps/controllers/maps.html',
        controller: 'MapsCtrl as vm'
      }
    }
  })

  .state('list', {
    url: '/list',
    templateUrl: 'components/home/controllers/home.html',
    controller: 'HomeCtrl as vm'
  });

  $urlRouterProvider.otherwise('/app/map');
}

module.exports = Router;