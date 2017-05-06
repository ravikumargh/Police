(function () {
  'use strict';

  angular
    .module('gallery.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('gallery', {
        url: '/gallery',
        templateUrl: '/modules/gallery/client/views/gallery.client.view.html',
        controller: 'GalleryController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Gallery'
        }
      });
  }
}());
