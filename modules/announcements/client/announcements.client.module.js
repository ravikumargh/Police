(function (app) {
  'use strict';

  app.registerModule('announcements', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('announcements.admin', ['core.admin']);
  app.registerModule('announcements.admin.routes', ['core.admin.routes']);
  app.registerModule('announcements.services');
  app.registerModule('announcements.routes', ['ui.router', 'core.routes', 'announcements.services']);
}(ApplicationConfiguration));
