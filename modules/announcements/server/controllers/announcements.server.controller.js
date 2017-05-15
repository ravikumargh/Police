'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Announcement = mongoose.model('Announcement'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an announcement
 */
exports.create = function (req, res) {
  var announcement = new Announcement(req.body);
  announcement.user = req.user;

  announcement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * Show the current announcement
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var announcement = req.announcement ? req.announcement.toJSON() : {};

  // Add a custom field to the Announcement, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Announcement model.
  announcement.isCurrentUserOwner = !!(req.user && announcement.user && announcement.user._id.toString() === req.user._id.toString());

  res.json(announcement);
};

/**
 * Update an announcement
 */
exports.update = function (req, res) {
  var announcement = req.announcement;

  announcement.displaydate = req.body.displaydate;
  announcement.content = req.body.content;

  announcement.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * Delete an announcement
 */
exports.delete = function (req, res) {
  var announcement = req.announcement;

  announcement.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcement);
    }
  });
};

/**
 * List of Announcements
 */
exports.list = function (req, res) {
  Announcement.find().sort('-created').populate('user', 'displayName').exec(function (err, announcements) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcements);
    }
  });
};
/**
 * Show the Todays announcement
 */
exports.readTodaysannouncement = function (req, res) {
   Announcement.find({"displaydate":{"$lte": new Date()}}).sort('displaydate').limit(1).populate('user', 'displayName').exec(function (err, announcements) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(announcements);
    }
  });
};
/**
 * Announcement middleware
 */
exports.announcementByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Announcement is invalid'
    });
  }

  Announcement.findById(id).populate('user', 'displayName').exec(function (err, announcement) {
    if (err) {
      return next(err);
    } else if (!announcement) {
      return res.status(404).send({
        message: 'No announcement with that identifier has been found'
      });
    }
    req.announcement = announcement;
    next();
  });
};
