// (function () {
//   'use strict';

//   angular
//     .module('videos')
//     .run(menuConfig);

//   menuConfig.$inject = ['menuService'];

//   function menuConfig(menuService) {
//     menuService.addMenuItem('topbar', {
//       title: 'Videos',
//       state: 'videos',
//       type: 'dropdown',
//       roles: ['*']
//     });

//     // Add the dropdown list item
//     menuService.addSubMenuItem('topbar', 'videos', {
//       title: 'List Videos',
//       state: 'videos.list',
//       roles: ['*']
//     });
//   }
// }());
