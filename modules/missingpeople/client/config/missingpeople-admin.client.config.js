(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('mPeople.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Missing People',
      state: 'admin.missingpeople.list'
    });
  }
}());


