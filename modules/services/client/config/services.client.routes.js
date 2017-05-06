(function () {
  'use strict';

  angular
    .module('services.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('services', {
        url: '/service',
        template: '<div ng-include="\'/modules/services/client/views/view-sidemenu-service.client.view.html\'" ></div>',
        controller: 'ServicesController',
        controllerAs: 'vm'
      })
      .state('services.list', {
        url: '/',
        templateUrl: '/modules/services/client/views/view-service.client.view.html' 
      })
      
      
      .state('services.sakala', {
        url: '/sakala',
        templateUrl: '/modules/services/client/views/view-service.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        } 
      })
      .state('services.passport', {
        url: '/passport',
        templateUrl: '/modules/services/client/views/view-service-passport.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Sakala Service'
        }
      }) .state('services.cc', {
        url: '/clearance-certificate',
        templateUrl: '/modules/services/client/views/view-cc.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      }).state('services.pvc', {
        url: '/police-verification-certificatee',
        templateUrl: '/modules/services/client/views/view-pvc.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      });



  }
 
}());

 