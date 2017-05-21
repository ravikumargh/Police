(function () {
  'use strict';

  angular
    .module('investigations.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('investigations', {
        abstract: true,
        url: '/investigation',
        template: '<ui-view/>'
      })
      .state('investigations.list', {
        url: '',
        templateUrl: '/modules/investigations/client/views/list-investigations.client.view.html',
        controller: 'InvestigationListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Investigations List'
        }
      })
      .state('investigations.view', {
        url: '/:investigationId',
        templateUrl: '/modules/investigations/client/views/view-investigations.client.view.html',
        controller: 'InvestigationsController',
        controllerAs: 'vm',
        resolve: {
          investigationResolve: getInvestigation
        },
        data: {
          pageTitle: 'Investigation {{ investigateResolve.title }}'
        }
      });
  }

  getInvestigation.$inject = ['$stateParams', 'InvestigationsService'];

  function getInvestigation($stateParams, InvestigationsService) {
    return InvestigationsService.get({
      investigationId: $stateParams.investigationId
    }).$promise;
  }
}());
