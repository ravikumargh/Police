(function () {
  'use strict';

  angular
    .module('crimes.admin')
    .controller('CrimesAdminController', CrimesAdminController);

  CrimesAdminController.$inject = ['$scope', '$state', '$window', 'crimeResolve', 'Authentication', 'Notification'];

  function CrimesAdminController($scope, $state, $window, crime, Authentication, Notification) {
    var vm = this;

    vm.crime = crime;
    if(vm.crime && vm.crime.date){
      vm.crime.date = new Date(vm.crime.date);
    }
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Crime
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.crime.$remove(function() {
          $state.go('admin.crimes.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Crime deleted successfully!' });
        });
      }
    }

    // Save Crime
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.crimeForm');
        return false;
      }

      // Create a new Crime, or update the current instance
      vm.crime.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.crimes.list'); // should we send the User to the list or the updated Crime's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Crime saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Crime save error!' });
      }
    }
  }
}());
