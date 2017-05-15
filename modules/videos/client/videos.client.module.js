(function (app) {
  'use strict';

  app.registerModule('videos', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('videos.admin', ['core.admin']);
  app.registerModule('videos.admin.routes', ['core.admin.routes']);
  app.registerModule('videos.services');
  app.registerModule('videos.routes', ['ui.router', 'core.routes', 'videos.services']);
}(ApplicationConfiguration));
