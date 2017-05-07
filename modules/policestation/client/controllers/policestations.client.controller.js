(function () {
    'use strict';

    angular
        .module('policestations')
        .controller('PolicestationsController', PolicestationsController);

    //PolicestationsController.$inject = ['$scope', 'pageResolve', 'Authentication'];

    function PolicestationsController($scope) {
        var vm = this;
        vm.isCollapsed = false;
        vm.oneAtATime = true;


        vm.filters = [
            {
                'title': 'Passport Policestations',
                'href': 'policestations.passport'
            },
            {
                'title': 'Sakala Policestation',
                'href': 'policestations.sakala'
            },
             {
                'title': 'Clearance Certificate',
                'href': 'policestations.cc'
            },
             {
                'title': 'Verification Certificate',
                'href': 'policestations.pvc'
            }
        ];
        vm.selected = -1;

        vm.select = function (index) {
            vm.selected = index;
        };

    }
}());
