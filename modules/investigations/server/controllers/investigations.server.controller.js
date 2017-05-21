'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Investigation = mongoose.model('Investigation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an investigation
 */
exports.create = function (req, res) {
  var investigation = new Investigation(req.body);
  investigation.user = req.user;

  investigation.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(investigation);
    }
  });
};

/**
 * Show the current investigation
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var investigation = req.investigation ? req.investigation.toJSON() : {};

  // Add a custom field to the investigation, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the investigation model.
  investigation.isCurrentUserOwner = !!(req.user && investigation.user && investigation.user._id.toString() === req.user._id.toString());

  res.json(investigation);
};

/**
 * Update an investigation
 */
exports.update = function (req, res) {
  var investigation = req.investigation;

  investigation.title = req.body.title;
  investigation.station = req.body.station;
  investigation.case = req.body.case;
  investigation.amount = req.body.amount;
  investigation.vehicleInfo = req.body.vehicleInfo;
  investigation.date = req.body.date;

  investigation.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(investigation);
    }
  });
};

/**
 * Delete an investigation
 */
exports.delete = function (req, res) {
  var investigation = req.investigation;

  investigation.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(investigation);
    }
  });
};

/**
 * List of Investigations
 */
exports.list = function (req, res) {
  Investigation.find().sort('-created').populate('user', 'displayName').exec(function (err, investigations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(investigations);
    }
  });
};
/**
 * List of Investigations
 */
exports.top = function (req, res) {
  Investigation.find().sort('-created').limit(3).populate('user', 'displayName').exec(function (err, investigations) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(investigations);
    }
  });
};
/**
 * Investigation middleware
 */
exports.investigationByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Investigation is invalid'
    });
  }

  Investigation.findById(id).populate('user', 'displayName').exec(function (err, investigation) {
    if (err) {
      return next(err);
    } else if (!investigation) {
      return res.status(404).send({
        message: 'No investigation with that identifier has been found'
      });
    }
    req.investigation = investigation;
    next();
  });
};
