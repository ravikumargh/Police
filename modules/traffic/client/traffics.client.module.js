(function (app) {
  'use strict';

  app.registerModule('traffics', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('traffics.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));

