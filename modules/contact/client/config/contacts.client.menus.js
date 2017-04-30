(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Contact Us',
      state: 'contacts',      
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'About Us',
      state: 'aboutus',      
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'RTI',
      state: 'rti',      
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'FAQ',
      state: 'faq',      
      roles: ['*']
    });
  }
}());
