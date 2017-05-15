(function () {
  'use strict';

  // Configuring the Videos Admin module
  angular
    .module('videos.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Videos',
      state: 'admin.videos.list'
    });
  }
}());
