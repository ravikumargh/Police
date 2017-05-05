(function () {
  'use strict';

  angular
    .module('services.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('services', {
        url: '/service',
        template: '<div ng-include="\'/modules/services/client/views/view-sidemenu-service.client.view.html\'" ></div>',
        controller: 'ServicesController',
        controllerAs: 'vm'
      })
      .state('services.list', {
        url: '/',
        templateUrl: '/modules/services/client/views/view-service.client.view.html' 
      })
      
      
      .state('services.sakala', {
        url: '/sakala',
        templateUrl: '/modules/services/client/views/view-service.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        } 
      })
      .state('services.passport', {
        url: '/passport',
        templateUrl: '/modules/services/client/views/view-service-passport.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Sakala Service'
        }
      }) .state('services.cc', {
        url: '/clearance-certificate',
        templateUrl: '/modules/services/client/views/view-cc.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      }).state('services.pvc', {
        url: '/police-verification-certificatee',
        templateUrl: '/modules/services/client/views/view-pvc.client.view.html',
        controller: 'ServicesController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      });



  }


 angular
    .module('services').directive('customCollapse', function () {
    return {
        require: '?ngModel',
        scope:{
            ngModel: '='
        },
        restrict: 'A',
        template: '<div class="panel-group" id="{{panelId}}">\
                       <div class="panel panel-default" ng-repeat-start="item in ngModel">\
                           <div class="panel-heading">\
                               <h4 class="panel-title">\
<a ng-click="toggleCollapsedStates($index)" href="#{{panelBaseId}}-{{$index}}">{{item.title}}</a>\
                               </h4>\
                           </div>\
<div id="{{panelBaseId}}-{{$index}}" data-parent="#{{panelId}}" class="panel-collapse collapse">\
                               <div class="panel-body" ui-view="{{item.viewname}}" ></div>\
                           </div>\
                       </div>\
                       <div ng-repeat-end></div>\
                   </div>',
        link: function(scope, el, attrs) {
            scope.panelBaseId = attrs.collapsePanelBodyId;
            scope.panelId = attrs.collapsePanelId;
            
            $(document).ready(function(){
                angular.forEach(scope.ngModel, function(value, key){
                    if (value.collapsed)
                    {
                        $("#" + scope.panelBaseId + "-" + key).collapse('show');
                    }
                });
            });
            
            scope.toggleCollapsedStates = function(ind){
                angular.forEach(scope.ngModel, function(value, key){
                    if (key == ind)
                    {
                        scope.ngModel[key].collapsed = !scope.ngModel[key].collapsed;
                        $("#" + scope.panelBaseId + "-" + ind).collapse('toggle');
                    }
                    else
                        scope.ngModel[key].collapsed = false;
                });
            }
        }
    };
});

}());

 