(function () {
  'use strict';

  angular
    .module('crimes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Crimes',
      state: 'crimes.list',
      roles: ['*']
    });
  }
}());
