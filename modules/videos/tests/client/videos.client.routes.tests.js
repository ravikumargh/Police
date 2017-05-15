(function () {
  'use strict';

  describe('Videos Route Tests', function () {
    // Initialize global variables
    var $scope,
      VideosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _VideosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      VideosService = _VideosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('videos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/videos');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('List Route', function () {
        var liststate;
        beforeEach(inject(function ($state) {
          liststate = $state.get('videos.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should not be abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/videos/client/views/list-videos.client.view.html');
        });
      });

      describe('View Route', function () {
        var viewstate,
          VideosController,
          mockVideo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('videos.view');
          $templateCache.put('/modules/videos/client/views/view-video.client.view.html', '');

          // create mock video
          mockVideo = new VideosService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Video about MEAN',
            link: 'MEAN rocks!'
          });

          // Initialize Controller
          VideosController = $controller('VideosController as vm', {
            $scope: $scope,
            videoResolve: mockVideo
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:videoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.videoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            videoId: 1
          })).toEqual('/videos/1');
        }));

        it('should attach an video to the controller scope', function () {
          expect($scope.vm.video._id).toBe(mockVideo._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('/modules/videos/client/views/view-video.client.view.html');
        });
      });

      describe('Handle Trailing Slash', function () {
        beforeEach(inject(function ($state, $rootScope, $templateCache) {
          $templateCache.put('/modules/videos/client/views/list-videos.client.view.html', '');

          $state.go('videos.list');
          $rootScope.$digest();
        }));

        it('Should remove trailing slash', inject(function ($state, $location, $rootScope) {
          $location.path('videos/');
          $rootScope.$digest();

          expect($location.path()).toBe('/videos');
          expect($state.current.templateUrl).toBe('/modules/videos/client/views/list-videos.client.view.html');
        }));
      });
    });
  });
}());
