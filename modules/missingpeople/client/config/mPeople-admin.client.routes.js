(function () {
  'use strict';

  angular
    .module('mPeople.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.missingpeople', {
        abstract: true,
        url: '/missingpeople',
        template: '<ui-view/>'
      })
      .state('admin.missingpeople.list', {
        url: '',
        templateUrl: '/modules/missingpeople/client/views/admin/list-missingpeople.client.view.html',
        controller: 'MissingPeopleAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.missingpeople.create', {
        url: '/create',
        templateUrl: '/modules/missingpeople/client/views/admin/form-missingpeople.client.view.html',
        controller: 'MissingPeopleAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          missingPeopleResolve: newMissingPeople
        }
      })
      .state('admin.missingpeople.edit', {
        url: '/:mPeopleId/edit',
        templateUrl: '/modules/missingpeople/client/views/admin/form-missingpeople.client.view.html',
        controller: 'MissingPeopleAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          missingPeopleResolve: getMissingPeople
        }
      });
  }

  getMissingPeople.$inject = ['$stateParams', 'MissingPeopleService'];

  function getMissingPeople($stateParams, MissingPeopleService) {
    return MissingPeopleService.get({
      mPeopleId: $stateParams.mPeopleId
    }).$promise;
  }

  newMissingPeople.$inject = ['MissingPeopleService'];

  function newMissingPeople(MissingPeopleService) {
    return new MissingPeopleService();
  }
}());
