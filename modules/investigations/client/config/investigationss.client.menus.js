(function () {
  'use strict';

  angular
    .module('investigations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'IMV',
      state: 'investigations.list',
      roles: ['*']
    });
  }
}());
