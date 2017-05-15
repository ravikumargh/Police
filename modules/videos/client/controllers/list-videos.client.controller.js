(function () {
  'use strict';

  angular
    .module('videos')
    .controller('VideosListController', VideosListController);

  VideosListController.$inject = ['VideosService'];

  function VideosListController(VideosService) {
    var vm = this;

    vm.videos = VideosService.query();
  }
}());
