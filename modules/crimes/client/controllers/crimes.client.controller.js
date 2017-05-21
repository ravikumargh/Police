(function () {
  'use strict';

  angular
    .module('crimes')
    .controller('CrimesController', CrimesController);

  CrimesController.$inject = ['$scope', 'crimeResolve', 'Authentication'];

  function CrimesController($scope, crime, Authentication) {
    var vm = this;
    debugger;
    vm.crime = crime;
    vm.authentication = Authentication;

  }
}());
