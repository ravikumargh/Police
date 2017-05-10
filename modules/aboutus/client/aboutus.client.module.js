(function (app) {
  'use strict';

  app.registerModule('aboutus', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('aboutus.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

