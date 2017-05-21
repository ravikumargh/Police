(function (app) {
  'use strict';

  app.registerModule('investigations', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('investigations.admin', ['core.admin']);
  app.registerModule('investigations.admin.routes', ['core.admin.routes']);
  app.registerModule('investigations.services');
  app.registerModule('investigations.routes', ['ui.router', 'core.routes', 'investigations.services']);
}(ApplicationConfiguration));
