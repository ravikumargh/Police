(function () {
  'use strict';

  // Configuring the Announcements Admin module
  angular
    .module('announcements.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Announcements',
      state: 'admin.announcements.list'
    });
  }
}());
