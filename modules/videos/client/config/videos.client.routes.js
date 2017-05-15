(function () {
  'use strict';

  angular
    .module('videos.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('videos', {
        abstract: true,
        url: '/videos',
        template: '<ui-view/>'
      })
      .state('videos.list', {
        url: '',
        templateUrl: '/modules/videos/client/views/list-videos.client.view.html',
        controller: 'VideosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Videos List'
        }
      })
      .state('videos.view', {
        url: '/:videoId',
        templateUrl: '/modules/videos/client/views/view-video.client.view.html',
        controller: 'VideosController',
        controllerAs: 'vm',
        resolve: {
          videoResolve: getVideo
        },
        data: {
          pageTitle: 'Video {{ videoResolve.title }}'
        }
      });
  }

  getVideo.$inject = ['$stateParams', 'VideosService'];

  function getVideo($stateParams, VideosService) {
    return VideosService.get({
      videoId: $stateParams.videoId
    }).$promise;
  }
}());
