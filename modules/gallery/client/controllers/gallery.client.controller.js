(function () {
  'use strict';

  angular
    .module('gallery')

    .controller('GalleryController', GalleryController);

  GalleryController.$inject = ['$scope', '$timeout', 'GalleryService'];

  function GalleryController($scope, $timeout, GalleryService) {
    var vm = this;

    vm.gallery = GalleryService.query();
    vm.init = function () {
      angular.element(document).ready(function () {
        window.setTimeout(function () {
          $("#lightgallery").lightGallery();
        }, 1000);
      });
    }
  }
}());
