(function () {
  'use strict';

  angular
    .module('announcements.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('announcements', {
        abstract: true,
        url: '/announcements',
        template: '<ui-view/>'
      })
      .state('announcements.list', {
        url: '',
        templateUrl: '/modules/announcements/client/views/list-announcements.client.view.html',
        controller: 'AnnouncementsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Announcements List'
        }
      })
      .state('announcements.view', {
        url: '/:announcementId',
        templateUrl: '/modules/announcements/client/views/view-announcement.client.view.html',
        controller: 'AnnouncementsController',
        controllerAs: 'vm',
        resolve: {
          announcementResolve: getAnnouncement
        },
        data: {
          pageTitle: 'Announcement {{ announcementResolve.title }}'
        }
      });
  }

  getAnnouncement.$inject = ['$stateParams', 'AnnouncementsService'];

  function getAnnouncement($stateParams, AnnouncementsService) {
    return AnnouncementsService.get({
      announcementId: $stateParams.announcementId
    }).$promise;
  }
}());
