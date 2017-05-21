(function () {
  'use strict';

  angular
    .module('mPeople.services')
    .factory('MissingPeopleService', MissingPeopleService)
    .factory('MissingPeopleTopService', MissingPeopleTopService);

  MissingPeopleService.$inject = ['$resource', '$log'];

  function MissingPeopleService($resource, $log) {
    var MissingPeople = $resource('/api/missingpeople/:mPeopleId', {
      mPeopleId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(MissingPeople.prototype, {
      createOrUpdate: function () {
        var missingPeople = this;
        return createOrUpdate(missingPeople);
      }
    });

    return MissingPeople;

    function createOrUpdate(missingpeople) {
      if (missingpeople._id) {
        return missingpeople.$update(onSuccess, onError);
      } else {
        return missingpeople.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(investigation) {
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
  function MissingPeopleTopService($resource, $log) {
    var MissingPeople = $resource('/api/missingpeople/top');
    return MissingPeople;

  }
}());
