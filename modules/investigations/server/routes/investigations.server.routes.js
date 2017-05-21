'use strict';

/**
 * Module dependencies
 */
var investigationsPolicy = require('../policies/investigations.server.policy'),
  investigations = require('../controllers/investigations.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/investigations').all(investigationsPolicy.isAllowed)
    .get(investigations.list)
    .post(investigations.create);
  app.route('/api/investigations/top').all(investigationsPolicy.isAllowed)
    .get(investigations.top);
  // Single article routes
  app.route('/api/investigations/:investigationId').all(investigationsPolicy.isAllowed)
    .get(investigations.read)
    .put(investigations.update)
    .delete(investigations.delete);

  // Finish by binding the article middleware
  app.param('investigationId', investigations.investigationByID);
};
