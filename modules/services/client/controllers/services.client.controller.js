(function () {
    'use strict';

    angular
        .module('services')
        .controller('ServicesController', ServicesController);

    // ServicesController.$inject = ['$scope', 'pageResolve', 'Authentication'];

    function ServicesController($scope) {
        var vm = this;
        vm.isCollapsed = false;
        vm.oneAtATime = true;
        vm.filters = [
            {
                'title': 'Passport Services',
                'href': 'services.passport',
                'icon': 'fa-book'
            },
            {
                'title': 'Sakala Service',
                'href': 'services.sakala',
                'icon': 'fa-binoculars'
            },
            {
                'title': 'Clearance Certificate',
                'href': 'services.cc',
                'icon': 'fa-hand-stop-o'
            },
            {
                'title': 'Verification Certificate',
                'href': 'services.pvc',
                'icon': 'fa-book'
            }
        ];
        vm.selected = -1;
        vm.select = function (index) {
            vm.selected = index;
            vm.isCollapsed = false;
        };
    }
}());
