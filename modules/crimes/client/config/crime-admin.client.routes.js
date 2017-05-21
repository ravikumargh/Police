(function () {
  'use strict';

  angular
    .module('crimes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.crimes', {
        abstract: true,
        url: '/crimes',
        template: '<ui-view/>'
      })
      .state('admin.crimes.list', {
        url: '',
        templateUrl: '/modules/crimes/client/views/admin/list-crimes.client.view.html',
        controller: 'CrimesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.crimes.create', {
        url: '/create',
        templateUrl: '/modules/crimes/client/views/admin/form-crime.client.view.html',
        controller: 'CrimesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crimeResolve: newCrime
        }
      })
      .state('admin.crimes.edit', {
        url: '/:crimeId/edit',
        templateUrl: '/modules/crimes/client/views/admin/form-crime.client.view.html',
        controller: 'CrimesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          crimeResolve: getCrime
        }
      });
  }

  getCrime.$inject = ['$stateParams', 'CrimesService'];

  function getCrime($stateParams, CrimesService) {
    return CrimesService.get({
      crimeId: $stateParams.crimeId
    }).$promise;
  }

  newCrime.$inject = ['CrimesService'];

  function newCrime(CrimesService) {
    return new CrimesService();
  }
}());
