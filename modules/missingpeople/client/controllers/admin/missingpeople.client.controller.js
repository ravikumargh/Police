(function () {
  'use strict';

  angular
    .module('mPeople.admin')
    .controller('MissingPeopleAdminController', MissingPeopleAdminController);

  MissingPeopleAdminController.$inject = ['$scope', '$state', '$window', 'missingPeopleResolve', 'Authentication', 'Notification','Upload','$timeout'];

  function MissingPeopleAdminController($scope, $state, $window, mPeople, Authentication, Notification,Upload,$timeout) {
    var vm = this;

    vm.missingpeople = mPeople;
    if(vm.missingpeople && vm.missingpeople.date){
      vm.missingpeople.date = new Date(vm.missingpeople.date);
      vm.missingpeople.firdate = new Date(vm.missingpeople.firdate);
    }
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing mPeople
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.missingpeople.$remove(function() {
          $state.go('admin.mPeoples.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> mPeople deleted successfully!' });
        });
      }
    }

    // Save mPeople
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.mPeopleForm');
        return false;
      }

      // Create a new mPeople, or update the current instance
      vm.missingpeople.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.missingpeople.list'); // should we send the User to the list or the updated mPeople's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> missing people saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> missing people save error!' });
      }
    }



    vm.progress = 0;
    if(angular.isUndefined($state.params.mPeopleId)){
      vm.missingpeople.profileImageURL = 'http://localhost:3000/modules/users/client/img/profile/default.png';
    }
    vm.upload = function (file) {
      Upload.upload({
        url: '/api/missingpeople/picture',
        data: {file:file}
      }).then(function () {
        vm.missingpeople.profileImageURL = '/modules/gallery/client/img/'+file.name;
      }, function (response) {
        if (response.status > 0) onErrorItem(response.data);
      }, function (evt) {
        vm.progress = parseInt(100.0 * evt.loaded / evt.total, 10);
      });
    };

    // Called after the user has successfully uploaded a new picture
    function onSuccessItem(response) {
      // Show success message
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Successfully changed profile picture' });

      // Populate user object
      vm.user = Authentication.user = response;

      // Reset form
      vm.fileSelected = false;
      vm.progress = 0;
    }

    // Called after the user has failed to upload a new picture
    function onErrorItem(response) {
      vm.fileSelected = false;
      vm.progress = 0;

      // Show error message
      Notification.error({ message: response.message, title: '<i class="glyphicon glyphicon-remove"></i> Failed to change profile picture' });
    }

  }
}());
