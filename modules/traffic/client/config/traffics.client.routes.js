(function () {
  'use strict';

  angular
    .module('traffics.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('traffics', {
        url: '/traffic',
        template: '<div ng-include="\'/modules/traffic/client/views/view-sidemenu-traffic.client.view.html\'" ></div>',
        controller: 'TrafficsController',
        controllerAs: 'vm'
      })
      .state('traffics.list', {
        url: '/',
        templateUrl: '/modules/traffic/client/views/view-traffic.client.view.html' 
      })
      
      
      .state('traffics.rules', {
        url: '/traffic-rules',
        templateUrl: '/modules/traffic/client/views/view-rules.client.view.html',
        controller: 'TrafficsController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        } 
      })
      .state('traffics.youobserved', {
        url: '/you-are-observed',
        templateUrl: '/modules/traffic/client/views/view-youobserved.client.view.html',
        controller: 'TrafficsController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Sakala Traffic'
        }
      }) .state('traffics.signboards', {
        url: '/sign-boards',
        templateUrl: '/modules/traffic/client/views/view-signboards.client.view.html',
        controller: 'TrafficsController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      }).state('traffics.penaltychart', {
        url: '/penalty-chart',
        templateUrl: '/modules/traffic/client/views/view-penaltychart.client.view.html',
        controller: 'TrafficsController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      }).state('traffics.advice', {
        url: '/advice-to-drivers',
        templateUrl: '/modules/traffic/client/views/view-advice.client.view.html',
        controller: 'TrafficsController',
        controllerAs: 'vm',
         data: {
          pageTitle: 'Page {{ pageResolve.title }}'
        }
      });



  }


 angular
    .module('traffics').directive('customCollapse', function () {
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

 