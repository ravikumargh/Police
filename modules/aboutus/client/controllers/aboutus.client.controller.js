(function () {
    'use strict';

    angular
        .module('aboutus')
        .controller('AboutusController', AboutusController);

    //AboutusController.$inject = ['$scope', 'pageResolve', 'Authentication'];

    function AboutusController($scope) {
        var vm = this;
        vm.isCollapsed = false;
        vm.oneAtATime = true;


        vm.filters = [
            {
                'title': 'Law and Order',
                'href': 'aboutus.lawandorder',
                'icon': 'fa-book'
            },
            {
                'title': 'Service at Police Station',
                'href': 'aboutus.service',
                'icon': 'fa-binoculars'
            },
             {
                'title': 'Citizens Rights',
                'href': 'aboutus.citizensrights',
                'icon': 'fa-hand-stop-o'
            },
             {
                'title': 'Duties of Citizens',
                'href': 'aboutus.citizensduties',
                'icon': 'fa-book'
            } 
        ];
        vm.selected = -1;

        vm.select = function (index) {
            vm.selected = index;
        };

    }
}());
