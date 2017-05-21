(function () {
  'use strict';

  angular
    .module('investigations.admin')
    .controller('InvestigationsAdminController', InvestigationsAdminController);

  InvestigationsAdminController.$inject = ['$scope', '$state', '$window', 'investigationResolve', 'Authentication', 'Notification'];

  function InvestigationsAdminController($scope, $state, $window, investigation, Authentication, Notification) {
    var vm = this;

    vm.investigation = investigation;
    if(vm.investigation && vm.investigation.date){
      vm.investigation.date = new Date(vm.investigation.date);
    }
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing investigation
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.investigation.$remove(function() {
          $state.go('admin.investigations.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> investigation deleted successfully!' });
        });
      }
    }

    // Save investigation
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.investigationForm');
        return false;
      }

      // Create a new investigation, or update the current instance
      vm.investigation.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.investigations.list'); // should we send the User to the list or the updated investigation's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> investigation saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> investigation save error!' });
      }
    }
  }
}());
