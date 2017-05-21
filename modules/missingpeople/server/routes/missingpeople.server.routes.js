'use strict';

/**
 * Module dependencies
 */
var missingPeoplePolicy = require('../policies/missingpeople.server.policy'),
  missingPeople = require('../controllers/missingpeople.server.controller');

module.exports = function (app) {
  app.route('/api/missingpeople/picture').post(missingPeople.uploadMissingPeopleImage);
  // Articles collection routes
  app.route('/api/missingpeople').all(missingPeoplePolicy.isAllowed)
    .get(missingPeople.list)
    .post(missingPeople.create);
  app.route('/api/missingpeople/top').all(missingPeoplePolicy.isAllowed)
    .get(missingPeople.top);
  // Single article routes
  app.route('/api/missingpeople/:mPeopleId').all(missingPeoplePolicy.isAllowed)
    .get(missingPeople.read)
    .put(missingPeople.update)
    .delete(missingPeople.delete);

  // Finish by binding the article middleware
  app.param('mPeopleId', missingPeople.mPeopleByID);
};
