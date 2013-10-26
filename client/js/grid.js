angular.module('itp13.grid', ['itp13.resources'])
  .controller('GridCtrl', ['$scope', 'Media', GridCtrl]);

function GridCtrl($scope, Media) {
  $scope.medias = Media.query();
  $scope.count = Media.count();
}