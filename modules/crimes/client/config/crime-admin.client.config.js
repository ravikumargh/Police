(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('crimes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Crimes',
      state: 'admin.crimes.list'
    });
  }
}());


