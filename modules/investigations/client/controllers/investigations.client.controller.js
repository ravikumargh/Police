(function () {
  'use strict';

  angular
    .module('investigations')
    .controller('InvestigationsController', InvestigationsController);

  InvestigationsController.$inject = ['$scope', 'investigationResolve', 'Authentication'];

  function InvestigationsController($scope, investigation, Authentication) {
    var vm = this;

    vm.investigation = investigation;
    vm.authentication = Authentication;

  }
}());
