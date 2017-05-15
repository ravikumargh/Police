(function () {
  'use strict';

  angular
    .module('videos')
    .controller('VideosController', VideosController);

  VideosController.$inject = ['$scope', 'videoResolve', 'Authentication'];

  function VideosController($scope, video, Authentication) {
    var vm = this;

    vm.video = video;
    vm.authentication = Authentication;

  }
}());
