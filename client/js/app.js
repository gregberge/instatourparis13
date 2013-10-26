angular.module('itp13', ['itp13.grid'])
  .config(['$locationProvider', '$routeProvider', configure]);

function configure($locationProvider, $routeProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/photos', {
      templateUrl: '/views/grid.html',
      controller: 'GridCtrl'
    });
}