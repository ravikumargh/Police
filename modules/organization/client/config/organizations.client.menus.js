(function () {
  'use strict';

  angular
    .module('organizations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Organization Chart',
      state: 'organizations',
      roles: ['*']
    });
 
  }
}());

 