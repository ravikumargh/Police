(function () {
  'use strict';

  angular
    .module('gallery.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.gallery', {
        abstract: true,
        url: '/gallery',
        template: '<ui-view/>'
      })
      .state('admin.gallery.list', {
        url: '',
        templateUrl: '/modules/gallery/client/views/admin/list-gallery.client.view.html',
        controller: 'GalleryAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.gallery.create', {
        url: '/create',
        templateUrl: '/modules/gallery/client/views/admin/form-gallery.client.view.html',
        controller: 'GalleryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          galleryResolve: newGallery
        }
      })
      .state('admin.gallery.edit', {
        url: '/:galleryId/edit',
        templateUrl: '/modules/gallery/client/views/admin/form-gallery.client.view.html',
        controller: 'GalleryAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          galleryResolve: getGallery
        }
      });
  }

  getGallery.$inject = ['$stateParams', 'GalleryService'];

  function getGallery($stateParams, GalleryService) {
    return GalleryService.get({
      galleryId: $stateParams.galleryId
    }).$promise;
  }

  newGallery.$inject = ['GalleryService'];

  function newGallery(GalleryService) {
    return new GalleryService();
  }
}());
