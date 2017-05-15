(function () {
  'use strict';

  angular
    .module('organizations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Organization',
      state: 'organizations',
      position:7,
      roles: ['*']
    });
 
  }
}());

 