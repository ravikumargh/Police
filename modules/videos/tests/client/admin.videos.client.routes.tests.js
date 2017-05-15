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
          mainstate = $state.get('admin.videos');
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
          liststate = $state.get('admin.videos.list');
        }));

        it('Should have the correct URL', function () {
          expect(liststate.url).toEqual('');
        });

        it('Should be not abstract', function () {
          expect(liststate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(liststate.templateUrl).toBe('/modules/videos/client/views/admin/list-videos.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          VideosAdminController,
          mockVideo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('admin.videos.create');
          $templateCache.put('/modules/videos/client/views/admin/form-video.client.view.html', '');

          // Create mock video
          mockVideo = new VideosService();

          // Initialize Controller
          VideosAdminController = $controller('VideosAdminController as vm', {
            $scope: $scope,
            videoResolve: mockVideo
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.videoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/admin/videos/create');
        }));

        it('should attach an video to the controller scope', function () {
          expect($scope.vm.video._id).toBe(mockVideo._id);
          expect($scope.vm.video._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('/modules/videos/client/views/admin/form-video.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          VideosAdminController,
          mockVideo;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('admin.videos.edit');
          $templateCache.put('/modules/videos/client/views/admin/form-video.client.view.html', '');

          // Create mock video
          mockVideo = new VideosService({
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Video about MEAN',
            link: 'MEAN rocks!'
          });

          // Initialize Controller
          VideosAdminController = $controller('VideosAdminController as vm', {
            $scope: $scope,
            videoResolve: mockVideo
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:videoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.videoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            videoId: 1
          })).toEqual('/admin/videos/1/edit');
        }));

        it('should attach an video to the controller scope', function () {
          expect($scope.vm.video._id).toBe(mockVideo._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('/modules/videos/client/views/admin/form-video.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
