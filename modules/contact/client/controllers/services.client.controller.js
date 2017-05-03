(function () {
  'use strict';

  angular
    .module('services')
    .controller('ServicesController', ServicesController);

  ServicesController.$inject = ['$scope', 'Authentication'];

  function ServicesController($scope, Authentication) {
    var vm = this;
    
    vm.isCollapsed = false;
 
    }
     
 
}());
