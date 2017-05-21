(function () {
  'use strict';

  angular
    .module('crimes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('crimes', {
        abstract: true,
        url: '/crimes',
        template: '<ui-view/>'
      })
      .state('crimes.list', {
        url: '',
        templateUrl: '/modules/crimes/client/views/list-crimes.client.view.html',
        controller: 'CrimesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Crimes List'
        }
      })
      .state('crimes.view', {
        url: '/:crimeId',
        templateUrl: '/modules/crimes/client/views/view-crimes.client.view.html',
        controller: 'CrimesController',
        controllerAs: 'vm',
        resolve: {
          crimeResolve: getCrime
        },
        data: {
          pageTitle: 'Crimes {{ crimeResolve.title }}'
        }
      });
  }

  getCrime.$inject = ['$stateParams', 'CrimesService'];

  function getCrime($stateParams, CrimesService) {
    return CrimesService.get({
      crimeId: $stateParams.crimeId
    }).$promise;
  }
}());
