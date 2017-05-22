(function () {
  'use strict';

  angular
    .module('policestations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // menuService.addMenuItem('topbar', {
    //   title: 'Policestations',
    //   state: 'policestations',
    //   position: 8,
    //   roles: ['*']
    // });
    menuService.addSubMenuItem('topbar', 'aboutus', {
      title: 'Policestations',
      state: 'policestations',
      roles: ['*']
    });
  }
}());

