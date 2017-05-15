(function () {
  'use strict';

  angular
    .module('announcements.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.announcements', {
        abstract: true,
        url: '/announcements',
        template: '<ui-view/>'
      })
      .state('admin.announcements.list', {
        url: '',
        templateUrl: '/modules/announcements/client/views/admin/list-announcements.client.view.html',
        controller: 'AnnouncementsAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.announcements.create', {
        url: '/create',
        templateUrl: '/modules/announcements/client/views/admin/form-announcement.client.view.html',
        controller: 'AnnouncementsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          announcementResolve: newAnnouncement
        }
      })
      .state('admin.announcements.edit', {
        url: '/:announcementId/edit',
        templateUrl: '/modules/announcements/client/views/admin/form-announcement.client.view.html',
        controller: 'AnnouncementsAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          announcementResolve: getAnnouncement
        }
      });
  }

  getAnnouncement.$inject = ['$stateParams', 'AnnouncementsService'];

  function getAnnouncement($stateParams, AnnouncementsService) {
    return AnnouncementsService.get({
      announcementId: $stateParams.announcementId
    }).$promise;
  }

  newAnnouncement.$inject = ['AnnouncementsService'];

  function newAnnouncement(AnnouncementsService) {
    return new AnnouncementsService();
  }
}());
