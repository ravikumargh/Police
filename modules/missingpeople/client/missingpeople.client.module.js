(function (app) {
  'use strict';

  app.registerModule('mPeople', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('mPeople.admin', ['core.admin']);
  app.registerModule('mPeople.admin.routes', ['core.admin.routes']);
  app.registerModule('mPeople.services');
  app.registerModule('mPeople.routes', ['ui.router', 'core.routes', 'mPeople.services']);
}(ApplicationConfiguration));
