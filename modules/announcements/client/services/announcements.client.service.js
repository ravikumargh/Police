(function () {
  'use strict';

  angular
    .module('announcements.services')
    .factory('AnnouncementsService', AnnouncementsService)
    .factory('TodaysAnnouncementsService', TodaysAnnouncementsService);

  AnnouncementsService.$inject = ['$resource', '$log'];

  function AnnouncementsService($resource, $log) {
    var Announcement = $resource('/api/announcements/:announcementId', {
      announcementId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Announcement.prototype, {
      createOrUpdate: function () {
        var announcement = this;
        return createOrUpdate(announcement);
      }
    });

    return Announcement;

    function createOrUpdate(announcement) {
      if (announcement._id) {
        return announcement.$update(onSuccess, onError);
      } else {
        return announcement.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(announcement) {
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

  
  function TodaysAnnouncementsService($resource, $log) {
    var Announcement = $resource('/api/todaysannouncement');
    return Announcement;
  }
}());
