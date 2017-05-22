(function () {
  'use strict';

  angular
    .module('contacts')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    //  menuService.addMenuItem('topbar', {
    //   title: 'Traffic',
    //   state: 'traffic',      
    //   roles: ['*']
    // });
    menuService.addMenuItem('topbar', {
      title: 'RTI',
      state: 'rti',
      position:6,      
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'FAQ',
      state: 'faq',
      position:7,      
      roles: ['*']
    });
    menuService.addMenuItem('topbar', {
      title: 'Contact Us',
      state: 'contacts',
      position:8,      
      roles: ['*']
    });
    // menuService.addMenuItem('topbar', {
    //   title: 'About Us',
    //   state: 'aboutus',      
    //   roles: ['*']
    // });
  }
}());
