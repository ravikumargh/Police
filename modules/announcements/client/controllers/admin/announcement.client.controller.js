(function () {
  'use strict';

  angular
    .module('announcements.admin')
    .controller('AnnouncementsAdminController', AnnouncementsAdminController);

  AnnouncementsAdminController.$inject = ['$scope', '$state', '$window', 'announcementResolve', 'Authentication', 'Notification'];

  function AnnouncementsAdminController($scope, $state, $window, announcement, Authentication, Notification) {
    var vm = this;

    vm.announcement = announcement;
    vm.announcement.displaydate = new Date(vm.announcement.displaydate);
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Announcement
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.announcement.$remove(function() {
          $state.go('admin.announcements.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Announcement deleted successfully!' });
        });
      }
    }

    // Save Announcement
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.announcementForm');
        return false;
      }

      // Create a new announcement, or update the current instance
      vm.announcement.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.announcements.list'); // should we send the User to the list or the updated Announcement's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Announcement saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, displaydate: '<i class="glyphicon glyphicon-remove"></i> Announcement save error!' });
      }
    }
  }
}());
