(function () {
  'use strict';

  angular
    .module('videos.admin')
    .controller('VideosAdminController', VideosAdminController);

  VideosAdminController.$inject = ['$scope', '$state', '$window', 'videoResolve', 'Authentication', 'Notification'];

  function VideosAdminController($scope, $state, $window, video, Authentication, Notification) {
    var vm = this;

    vm.video = video;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Video
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.video.$remove(function() {
          $state.go('admin.videos.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Video deleted successfully!' });
        });
      }
    }

    // Save Video
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.videoForm');
        return false;
      }

      // Create a new video, or update the current instance
      vm.video.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.videos.list'); // should we send the User to the list or the updated Video's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Video saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Video save error!' });
      }
    }
  }
}());
