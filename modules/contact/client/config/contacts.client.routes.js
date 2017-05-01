(function () {
  'use strict';

  angular
    .module('contacts.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      
      .state('contacts', {
        url: '/contactus',
        templateUrl: '/modules/contact/client/views/view-contact.client.view.html',
        controller: 'ContactsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Contact Us'
        }
      })
      .state('traffic', {
        url: '/traffic',
        templateUrl: '/modules/contact/client/views/view-traffic.client.view.html',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Trafic'
        }
      })
      .state('aboutus', {
        url: '/aboutus',
        templateUrl: '/modules/contact/client/views/view-aboutus.client.view.html',
        controllerAs: 'vm',
        data: {
          pageTitle: 'About Us'
        }
      })
      .state('rti', {
        url: '/rti',
        templateUrl: '/modules/contact/client/views/view-rti.client.view.html',
        controllerAs: 'vm',
        data: {
          pageTitle: 'RTI'
        }
      })
      .state('faq', {
        url: '/faq',
        templateUrl: '/modules/contact/client/views/view-faq.client.view.html',
        controller: 'ContactsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'FAQ'
        }
      });
  }
 
}());
