(function (app) {
  'use strict';

  app.registerModule('gallery', ['core']);
  app.registerModule('gallery.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
