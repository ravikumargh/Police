(function () {
  'use strict';

  angular
    .module('mPeople.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('missingpeople', {
        abstract: true,
        url: '/missingpeople',
        template: '<ui-view/>'
      })
      .state('missingpeople.list', {
        url: '',
        templateUrl: '/modules/missingpeople/client/views/list-missingpeople.client.view.html',
        controller: 'MissingPeopleListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Missingpeople List'
        }
      })
      .state('missingpeople.view', {
        url: '/:mPeopleId',
        templateUrl: '/modules/missingpeople/client/views/view-missingpeople.client.view.html',
        controller: 'MissingPeopleController',
        controllerAs: 'vm',
        resolve: {
          missingPeopleResolve: getMissingPeople
        },
        data: {
          pageTitle: 'Missingpeople {{ missingPeopleResolve.title }}'
        }
      });
  }

  getMissingPeople.$inject = ['$stateParams', 'MissingPeopleService'];

  function getMissingPeople($stateParams, MissingPeopleService) {
    return MissingPeopleService.get({
      mPeopleId: $stateParams.mPeopleId
    }).$promise;
  }
}());
