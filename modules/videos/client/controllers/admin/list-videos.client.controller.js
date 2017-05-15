(function () {
  'use strict';

  angular
    .module('videos.admin')
    .controller('VideosAdminListController', VideosAdminListController)
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }]);

  VideosAdminListController.$inject = ['VideosService'];

  function VideosAdminListController(VideosService) {
    var vm = this;

    vm.videos = VideosService.query();
  }
}());
 