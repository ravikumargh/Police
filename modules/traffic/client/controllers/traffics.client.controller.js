(function () {
    'use strict';

    angular
        .module('traffics')
        .controller('TrafficsController', TrafficsController);

    //TrafficsController.$inject = ['$scope', 'pageResolve', 'Authentication'];

    function TrafficsController($scope) {
        var vm = this;
        vm.isCollapsed = false;
        vm.oneAtATime = true;


        vm.filters = [
            {
                'title': 'Rules & Regulations',
                'href': 'traffics.rules',
                'icon': 'fa-book'
            },
            {
                'title': 'You are Observed',
                'href': 'traffics.youobserved',
                'icon': 'fa-binoculars'
            },
             {
                'title': 'Traffic Sign Boards',
                'href': 'traffics.signboards',
                'icon': 'fa-hand-stop-o'
            },
             {
                'title': 'Traffic Penalty Chart',
                'href': 'traffics.penaltychart',
                'icon': 'fa-newspaper-o'
            },
             {
                'title': 'Advice to Drivers',
                'href': 'traffics.advice',
                'icon': 'fa-mortar-board'
            }
        ];
        vm.selected = -1;

        vm.select = function (index) {
            vm.selected = index;
            vm.isCollapsed = false;
        };

    }
}());
