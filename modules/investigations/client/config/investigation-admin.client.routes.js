(function () {
  'use strict';

  angular
    .module('investigations.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.investigations', {
        abstract: true,
        url: '/investigations',
        template: '<ui-view/>'
      })
      .state('admin.investigations.list', {
        url: '',
        templateUrl: '/modules/investigations/client/views/admin/list-investigations.client.view.html',
        controller: 'InvestigationsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.investigations.create', {
        url: '/create',
        templateUrl: '/modules/investigations/client/views/admin/form-investigation.client.view.html',
        controller: 'InvestigationsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          investigationResolve: newInvestigation
        }
      })
      .state('admin.investigations.edit', {
        url: '/:investigationId/edit',
        templateUrl: '/modules/investigations/client/views/admin/form-investigation.client.view.html',
        controller: 'InvestigationsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          investigationResolve: getInvestigation
        }
      });
  }

  getInvestigation.$inject = ['$stateParams', 'InvestigationsService'];

  function getInvestigation($stateParams, InvestigationsService) {
    return InvestigationsService.get({
      investigationId: $stateParams.investigationId
    }).$promise;
  }

  newInvestigation.$inject = ['InvestigationsService'];

  function newInvestigation(InvestigationsService) {
    return new InvestigationsService();
  }
}());
