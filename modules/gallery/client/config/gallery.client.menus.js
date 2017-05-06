(function () {
  'use strict';

  angular
    .module('gallery')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addSubMenuItem('topbar','more', {
      title: 'Gallery',
      state: 'gallery',
      roles: ['*']
    });
  }
}());
