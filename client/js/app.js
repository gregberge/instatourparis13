(function () {

  angular.module('itp13', ['ui.router', 'itp13.grid', 'itp13.detail'])
    .config(['$locationProvider', '$urlRouterProvider', '$stateProvider', configure]);

  function configure($locationProvider, $urlRouterProvider, $stateProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.when('/', '/photos');
    $stateProvider
      .state('photos', {
        abstract: true,
        url: '/photos',
        templateUrl: '/views/photos/index.html'
      })
      .state('photos.grid', {
        url: '{path:/?}?p',
        templateUrl: '/views/photos/grid.html',
        controller: 'GridCtrl'
      })
      .state('photos.detail', {
        url: '/:id',
        templateUrl: '/views/photos/detail.html',
        controller: 'DetailCtrl'
      });
  }

})();