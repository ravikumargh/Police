(function (app) {
  'use strict';

  app.registerModule('gallery', ['core']);
  app.registerModule('gallery.admin', ['core.admin']);
  app.registerModule('gallery.admin.routes', ['core.admin.routes']);
  app.registerModule('gallery.services');
  app.registerModule('gallery.routes', ['ui.router', 'core.routes', 'gallery.services']);

}(ApplicationConfiguration));
