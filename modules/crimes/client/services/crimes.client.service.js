(function () {
  'use strict';

  angular
    .module('crimes.services')
    .factory('CrimesService', CrimesService)
    .factory('CrimesTopService', CrimesTopService);

  CrimesService.$inject = ['$resource', '$log'];

  function CrimesService($resource, $log) {
    var Crime = $resource('/api/crimes/:crimeId', {
      crimeId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(Crime.prototype, {
      createOrUpdate: function () {
        var crime = this;
        return createOrUpdate(crime);
      }
    });

    return Crime;

    function createOrUpdate(crime) {
      if (crime._id) {
        return crime.$update(onSuccess, onError);
      } else {
        return crime.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(crime) {
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
  function CrimesTopService($resource, $log) {
    var Crime = $resource('/api/crimes/top');
    return Crime;

  }
}());
