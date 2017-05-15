(function () {
  'use strict';

  angular
    .module('announcements')
    .controller('AnnouncementsController', AnnouncementsController);

  AnnouncementsController.$inject = ['$scope', 'announcementResolve', 'Authentication'];

  function AnnouncementsController($scope, announcement, Authentication) {
    var vm = this;

    vm.announcement = announcement;
    vm.authentication = Authentication;

  }
}());
