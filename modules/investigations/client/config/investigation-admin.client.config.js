(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('investigations.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage IMV',
      state: 'admin.investigations.list'
    });
  }
}());


