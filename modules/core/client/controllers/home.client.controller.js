(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  HomeController.$inject = ['$scope', 'ArticlesTopService','CrimesTopService','InvestigationsTopService'];

  function HomeController($scope, ArticlesTopService,CrimesTopService,InvestigationsTopService) {
    var vm = this;
    vm.topArticles = ArticlesTopService.query();
    vm.topCrimes = CrimesTopService.query();
    vm.investigations = InvestigationsTopService.query();
    $(document).ready(function () {
      $('#demo1').slippry({
        // general elements & wrapper
        slippryWrapper: '<div class="sy-box pictures-slider" />', // wrapper to wrap everything, including pager

        // options
        adaptiveHeight: false, // height of the sliders adapts to current slide
        captions: false, // Position: overlay, below, custom, false

        // pager
        pager: false,

        // controls
        controls: false,
        autoHover: false,

        // transitions
        transition: 'kenburns', // fade, horizontal, kenburns, false
        kenZoom: 140,
        speed: 6000 // time the transition takes (ms)
      });
    });

    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function (event) {
      didScroll = true;
    });

    setInterval(function () {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 250);

    function hasScrolled() {
      var st = $(window).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
        return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('#header-top').removeClass('nav-down').addClass('nav-up');
        $('#header-nav').removeClass('nav-down').addClass('nav-up');
      } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
          $('#header-top').removeClass('nav-up').addClass('nav-down');
          $('#header-nav').removeClass('nav-up').addClass('nav-down');
        }
      }

      lastScrollTop = st;
    }
  }


}());
