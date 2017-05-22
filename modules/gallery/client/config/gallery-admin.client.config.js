(function () {
  'use strict';

  // Configuring the Gallery Admin module
  angular
    .module('gallery.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Gallery',
      state: 'admin.gallery.list'
    });
  }
}());
