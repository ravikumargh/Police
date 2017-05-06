(function () {
    'use strict';

    angular
        .module('organizations.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('organizations', {
                url: '/organization',
                templateUrl: '/modules/organization/client/views/view-organization.client.view.html',
                controller: 'OrganizationsController',
                controllerAs: 'vm'
            })
            .state('organizations.list', {
                url: '/',
                templateUrl: '/modules/organization/client/views/view-organization.client.view.html'
            });
    }

}());

