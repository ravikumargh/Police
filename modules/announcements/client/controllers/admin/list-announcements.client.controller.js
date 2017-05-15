(function () {
  'use strict';

  angular
    .module('announcements.admin')
    .controller('AnnouncementsAdminListController', AnnouncementsAdminListController);

  AnnouncementsAdminListController.$inject = ['AnnouncementsService'];

  function AnnouncementsAdminListController(AnnouncementsService) {
    var vm = this;

    vm.announcements = AnnouncementsService.query();
  }
}());
