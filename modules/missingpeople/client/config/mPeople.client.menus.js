(function () {
  'use strict';

  angular
    .module('investigations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'MP',
      state: 'missingpeople.list',
      roles: ['*']
    });
  }
}());
