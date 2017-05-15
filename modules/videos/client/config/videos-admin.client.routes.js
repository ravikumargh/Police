(function () {
  'use strict';

  angular
    .module('videos.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.videos', {
        abstract: true,
        url: '/videos',
        template: '<ui-view/>'
      })
      .state('admin.videos.list', {
        url: '',
        templateUrl: '/modules/videos/client/views/admin/list-videos.client.view.html',
        controller: 'VideosAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.videos.create', {
        url: '/create',
        templateUrl: '/modules/videos/client/views/admin/form-video.client.view.html',
        controller: 'VideosAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          videoResolve: newVideo
        }
      })
      .state('admin.videos.edit', {
        url: '/:videoId/edit',
        templateUrl: '/modules/videos/client/views/admin/form-video.client.view.html',
        controller: 'VideosAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          videoResolve: getVideo
        }
      });
  }

  getVideo.$inject = ['$stateParams', 'VideosService'];

  function getVideo($stateParams, VideosService) {
    return VideosService.get({
      videoId: $stateParams.videoId
    }).$promise;
  }

  newVideo.$inject = ['VideosService'];

  function newVideo(VideosService) {
    return new VideosService();
  }
}());
