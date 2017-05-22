(function () {
  'use strict';

  angular
    .module('gallery.services')
    .factory('GalleryService', GalleryService)
    .factory('GalleryTopService', GalleryTopService);

  GalleryService.$inject = ['$resource', '$log'];

  function GalleryService($resource, $log) {
    var gallery = $resource('/api/photos/:photoId', {
      galleryId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(gallery.prototype, {
      createOrUpdate: function () {
        var gallery = this;
        return createOrUpdate(gallery);
      }
    });

    return gallery;

    function createOrUpdate(gallery) {
      if (gallery._id) {
        return gallery.$update(onSuccess, onError);
      } else {
        return gallery.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(gallery) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
  function GalleryTopService($resource, $log) {
    var gallery = $resource('/api/photos/top');
    return gallery;

  }
}());
