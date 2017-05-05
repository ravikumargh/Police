(function () {
  'use strict';

  angular
    .module('services')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Services',
      state: 'services',
      roles: ['*']
    });
 
  }
}());

 