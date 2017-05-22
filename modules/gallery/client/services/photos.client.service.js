// (function () {
//   'use strict';

//   angular
//     .module('photos.services')
//     .factory('PhotosService', PhotosService)
//     .factory('PhotosTopService', PhotosTopService);

//   PhotosService.$inject = ['$resource', '$log'];

//   function PhotosService($resource, $log) {
//     var Photo = $resource('/api/photos/:photoId', {
//       photoId: '@_id'
//     }, {
//         update: {
//           method: 'PUT'
//         }
//       });

//     angular.extend(Photo.prototype, {
//       createOrUpdate: function () {
//         var photo = this;
//         return createOrUpdate(photo);
//       }
//     });

//     return Photo;

//     function createOrUpdate(photo) {
//       if (photo._id) {
//         return photo.$update(onSuccess, onError);
//       } else {
//         return photo.$save(onSuccess, onError);
//       }

//       // Handle successful response
//       function onSuccess(photo) {
//         // Any required internal processing from inside the service, goes here.
//       }

//       // Handle error response
//       function onError(errorResponse) {
//         var error = errorResponse.data;
//         // Handle error internally
//         handleError(error);
//       }
//     }

//     function handleError(error) {
//       // Log error
//       $log.error(error);
//     }
//   }
//   function PhotosTopService($resource, $log) {
//     var Photo = $resource('/api/photos/top');
//     return Photo;

//   }
// }());
