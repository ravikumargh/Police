'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Video = mongoose.model('Video'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an video
 */
exports.create = function (req, res) {
  var video = new Video(req.body);
  video.user = req.user;

  video.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(video);
    }
  });
};

/**
 * Show the current video
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var video = req.video ? req.video.toJSON() : {};

  // Add a custom field to the Video, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Video model.
  video.isCurrentUserOwner = !!(req.user && video.user && video.user._id.toString() === req.user._id.toString());

  res.json(video);
};

/**
 * Update an video
 */
exports.update = function (req, res) {
  var video = req.video;

  video.title = req.body.title;
  video.link = req.body.link;

  video.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(video);
    }
  });
};

/**
 * Delete an video
 */
exports.delete = function (req, res) {
  var video = req.video;

  video.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(video);
    }
  });
};

/**
 * List of Videos
 */
exports.list = function (req, res) {
  Video.find().sort('-created').populate('user', 'displayName').exec(function (err, videos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(videos);
    }
  });
};
/**
 * List of Videos
 */
exports.top = function (req, res) {
  Video.find().sort('-created').limit(3).populate('user', 'displayName').exec(function (err, videos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(videos);
    }
  });
};
/**
 * Video middleware
 */
exports.videoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Video is invalid'
    });
  }

  Video.findById(id).populate('user', 'displayName').exec(function (err, video) {
    if (err) {
      return next(err);
    } else if (!video) {
      return res.status(404).send({
        message: 'No video with that identifier has been found'
      });
    }
    req.video = video;
    next();
  });
};
