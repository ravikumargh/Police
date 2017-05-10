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
                'href': 'aboutus.lawandorder'
            },
            {
                'title': 'Service at Police Station',
                'href': 'aboutus.service'
            },
             {
                'title': 'Citizens Rights',
                'href': 'aboutus.citizensrights'
            } 
        ];
        vm.selected = -1;

        vm.select = function (index) {
            vm.selected = index;
        };

    }
}());
