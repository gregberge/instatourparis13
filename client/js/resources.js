angular.module('itp13.resources', ['ngResource'])
  .factory('Media', ['$resource', Media]);

function Media($resource) {
  return $resource('/api/medias/:id', {id:'@id'}, {
    count: { method: 'GET', params: { id: 'count' } }
  });
}