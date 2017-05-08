(function () {
  'use strict';

  angular
    .module('traffics')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Traffic',
      state: 'traffics',
      roles: ['*']
    });
 
  }
}());

 