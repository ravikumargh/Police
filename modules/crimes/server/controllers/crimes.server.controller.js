'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Crime = mongoose.model('Crime'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an crime
 */
exports.create = function (req, res) {
  var crime = new Crime(req.body);
  crime.user = req.user;

  crime.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crime);
    }
  });
};

/**
 * Show the current crime
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var crime = req.crime ? req.crime.toJSON() : {};

  // Add a custom field to the Crime, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Crime model.
  crime.isCurrentUserOwner = !!(req.user && crime.user && crime.user._id.toString() === req.user._id.toString());

  res.json(crime);
};

/**
 * Update an crime
 */
exports.update = function (req, res) {
  var crime = req.crime;

  crime.title = req.body.title;
  crime.content = req.body.content;

  crime.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crime);
    }
  });
};

/**
 * Delete an crime
 */
exports.delete = function (req, res) {
  var crime = req.crime;

  crime.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crime);
    }
  });
};

/**
 * List of Crimes
 */
exports.list = function (req, res) {
  Crime.find().sort('-created').populate('user', 'displayName').exec(function (err, crimes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crimes);
    }
  });
};
/**
 * List of Crimes
 */
exports.top = function (req, res) {
  Crime.find().sort('-created').limit(3).populate('user', 'displayName').exec(function (err, crimes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(crimes);
    }
  });
};
/**
 * Crime middleware
 */
exports.crimeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Crime is invalid'
    });
  }

  Crime.findById(id).populate('user', 'displayName').exec(function (err, crime) {
    if (err) {
      return next(err);
    } else if (!crime) {
      return res.status(404).send({
        message: 'No crime with that identifier has been found'
      });
    }
    req.crime = crime;
    next();
  });
};
