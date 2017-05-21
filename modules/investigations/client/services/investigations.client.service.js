(function () {
  'use strict';

  angular
    .module('investigations.services')
    .factory('InvestigationsService', InvestigationsService)
    .factory('InvestigationsTopService', InvestigationsTopService);

  InvestigationsService.$inject = ['$resource', '$log'];

  function InvestigationsService($resource, $log) {
    var Investigation = $resource('/api/investigations/:investigationId', {
      investigationId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(Investigation.prototype, {
      createOrUpdate: function () {
        var investigation = this;
        return createOrUpdate(investigation);
      }
    });

    return Investigation;

    function createOrUpdate(investigation) {
      if (investigation._id) {
        return investigation.$update(onSuccess, onError);
      } else {
        return investigation.$save(onSuccess, onError);
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
  function InvestigationsTopService($resource, $log) {
    var Investigation = $resource('/api/investigations/top');
    return Investigation;

  }
}());
