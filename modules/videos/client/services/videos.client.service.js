(function () {
  'use strict';

  angular
    .module('videos.services')
    .factory('VideosService', VideosService)
    .factory('VideosTopService', VideosTopService);

  VideosService.$inject = ['$resource', '$log'];

  function VideosService($resource, $log) {
    var Video = $resource('/api/videos/:videoId', {
      videoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Video.prototype, {
      createOrUpdate: function () {
        var video = this;
        return createOrUpdate(video);
      }
    });

    return Video;

    function createOrUpdate(video) {
      if (video._id) {
        return video.$update(onSuccess, onError);
      } else {
        return video.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(video) {
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

  
  function VideosTopService($resource, $log) {
    var Video = $resource('/api/videos/top');
    return Video;
  }
}());
