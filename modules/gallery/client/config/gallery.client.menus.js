(function () {
  'use strict';

  angular
    .module('gallery')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Gallery',
      state: 'gallery'
    });
  }
}());
