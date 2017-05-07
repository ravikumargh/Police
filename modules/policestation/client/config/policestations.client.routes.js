(function () {
    'use strict';

    angular
        .module('policestations.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('policestations', {
                url: '/policestation',
                templateUrl: '/modules/policestation/client/views/view-policestation.client.view.html',
                controller: 'PolicestationsController',
                controllerAs: 'vm'
            })
            .state('policestations.list', {
                url: '/',
                templateUrl: '/modules/policestation/client/views/view-policestation.client.view.html'
            });
    }

}());