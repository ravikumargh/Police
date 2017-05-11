(function () {
    'use strict';

    angular
        .module('aboutus.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('aboutus', {
                url: '/aboutus',
                template: '<div ng-include="\'/modules/aboutus/client/views/view-sidemenu-aboutus.client.view.html\'" ></div>',
                controller: 'AboutusController',
                controllerAs: 'vm'
            })
            .state('aboutus.list', {
                url: '/',
                templateUrl: '/modules/aboutus/client/views/view-aboutus.client.view.html'
            })


            .state('aboutus.citizensduties', {
                url: '/duties-of-citizens',
                templateUrl: '/modules/aboutus/client/views/view-citizensduties.client.view.html',
                controller: 'AboutusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Page {{ pageResolve.title }}'
                }
            })
            .state('aboutus.lawandorder', {
                url: '/law-and-order',
                templateUrl: '/modules/aboutus/client/views/view-lawandorder.client.view.html',
                controller: 'AboutusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Law and Order'
                }
            }).state('aboutus.service', {
                url: '/service-at-police-station',
                templateUrl: '/modules/aboutus/client/views/view-service.client.view.html',
                controller: 'AboutusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Page {{ pageResolve.title }}'
                }
            }).state('aboutus.citizensrights', {
                url: '/citizens-rights',
                templateUrl: '/modules/aboutus/client/views/view-citizensrights.client.view.html',
                controller: 'AboutusController',
                controllerAs: 'vm',
                data: {
                    pageTitle: 'Page {{ pageResolve.title }}'
                }
            });



    }
}());

