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
      type: 'dropdown',
      position:3,
      roles: ['*']
    });
  menuService.addSubMenuItem('topbar', 'traffics', {
      title: 'Traffic',
      state: 'traffics',
      roles: ['*']
    });
     menuService.addSubMenuItem('topbar', 'traffics', {
      title: 'IMV',
      state: 'investigations.list',
      roles: ['*']
    });
  }
}());

 