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
      state: 'gallery',
      type: 'dropdown',
      position:5,
      roles: ['*']
    });

     

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'gallery', {
      title: 'Photos',
      state: 'gallery',
      roles: ['*']
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'gallery', {
      title: 'Videos',
      state: 'videos.list',
      roles: ['*']
    });

  }
}());
