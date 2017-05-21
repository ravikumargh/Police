'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Crimes Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/missingpeople',
      permissions: '*'
    }, {
      resources: '/api/missingpeople/:mPeopleId',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/missingpeople',
      permissions: ['get']
    },{
      resources: '/api/missingpeople/top',
      permissions: ['get']
    }, {
      resources: '/api/missingpeople/:mPeopleId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/missingpeople',
      permissions: ['get']
    },{
      resources: '/api/missingpeople/top',
      permissions: ['get']
    }, {
      resources: '/api/missingpeople/:mPeopleId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If Crimes Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an article is being processed and the current user created it then allow any manipulation
  if (req.missingpeople && req.user && req.missingpeople.user && req.missingpeople.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
