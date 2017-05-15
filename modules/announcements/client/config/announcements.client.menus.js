// (function () {
//   'use strict';

//   angular
//     .module('announcements')
//     .run(menuConfig);

//   menuConfig.$inject = ['menuService'];

//   function menuConfig(menuService) {
//     menuService.addMenuItem('topbar', {
//       title: 'Announcements',
//       state: 'announcements',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     menuService.addSubMenuItem('topbar', 'announcements', {
//       title: 'List Announcements',
//       state: 'announcements.list',
//       roles: ['*']
//     });
//   }
// }());
