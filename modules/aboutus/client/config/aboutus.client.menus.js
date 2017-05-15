(function () {
  'use strict';

  angular
    .module('aboutus')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'About us',
      state: 'aboutus',
      position:1,
      roles: ['*']
    });
 
  }
}());

 