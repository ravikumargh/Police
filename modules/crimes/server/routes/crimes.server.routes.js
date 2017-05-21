'use strict';

/**
 * Module dependencies
 */
var crimesPolicy = require('../policies/crimes.server.policy'),
  crimes = require('../controllers/crimes.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/crimes').all(crimesPolicy.isAllowed)
    .get(crimes.list)
    .post(crimes.create);
  app.route('/api/crimes/top').all(crimesPolicy.isAllowed)
    .get(crimes.top);
  // Single article routes
  app.route('/api/crimes/:crimeId').all(crimesPolicy.isAllowed)
    .get(crimes.read)
    .put(crimes.update)
    .delete(crimes.delete);

  // Finish by binding the article middleware
  app.param('crimeId', crimes.crimeByID);
};
