(function () {
  'use strict';

  angular
    .module('gallery')
    .controller('GalleryController', GalleryController);

  GalleryController.$inject = ['$scope'];

  function GalleryController($scope) {
    var vm = this;
 

    init();

    function init() {
       $(document).ready(function() {
        $("#lightgallery").lightGallery(); 
    });
    }

     
  }
}());
