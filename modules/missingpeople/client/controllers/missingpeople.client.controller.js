(function () {
  'use strict';

  angular
    .module('mPeople')
    .controller('MissingPeopleController', MissingPeopleController);

  MissingPeopleController.$inject = ['$scope', 'missingPeopleResolve', 'Authentication'];

  function MissingPeopleController($scope, missingPeople, Authentication) {
    var vm = this;

    vm.missingPeople = missingPeople;
    vm.authentication = Authentication;

  }
}());
