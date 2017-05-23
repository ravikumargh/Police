(function () {
  'use strict';

  angular
    .module('investigations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Missing People',
      state: 'missingpeople.list',      
      position:6,    
      roles: ['*']
    });
  }
}());
