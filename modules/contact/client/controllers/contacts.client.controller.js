(function () {
  'use strict';

  angular
    .module('contacts')
    .controller('ContactsController', ContactsController);

  ContactsController.$inject = ['$scope', 'Authentication'];

  function ContactsController($scope, Authentication) {
    var vm = this;
    vm.form = {};
    vm.authentication = Authentication;
    vm.save = save;
    vm.isCollapsed = false;

    // Save Contact
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.contactForm');
        return false;
      }

      // Create a new contact, or update the current instance
      vm.contact.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        // $state.go('admin.contacts.list'); // should we send the User to the list or the updated Contact's view?
        // Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Contact saved successfully!' });
      }

      function errorCallback(res) {
        // Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Contact save error!' });
      }

    
    }
    //RTI
  $('#myTabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
      });
  };
 
}());
