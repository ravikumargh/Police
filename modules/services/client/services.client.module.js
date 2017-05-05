(function (app) {
  'use strict';

  app.registerModule('services', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('services.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

