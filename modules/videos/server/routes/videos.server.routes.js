'use strict';

/**
 * Module dependencies
 */
var videosPolicy = require('../policies/videos.server.policy'),
  videos = require('../controllers/videos.server.controller');

module.exports = function (app) {
  // Videos collection routes
  app.route('/api/videos').all(videosPolicy.isAllowed)
    .get(videos.list)
    .post(videos.create);
app.route('/api/videos/top').all(videosPolicy.isAllowed)
    .get(videos.top);
  // Single video routes
  app.route('/api/videos/:videoId').all(videosPolicy.isAllowed)
    .get(videos.read)
    .put(videos.update)
    .delete(videos.delete);

  // Finish by binding the video middleware
  app.param('videoId', videos.videoByID);
};
