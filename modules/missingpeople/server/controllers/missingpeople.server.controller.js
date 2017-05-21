'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  express = require('express'),
  app = express(),
  mongoose = require('mongoose'),
  MissingPeople = mongoose.model('MissingPeople'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  fs = require('fs'),
  multer = require('multer');
  app.use('./modules/gallery/client/img/', express.static(__dirname + './modules/gallery/client/img/'));

  var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, './modules/gallery/client/img/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
 var upload = multer({ //multer settings
  storage: storage
}).single('file');

/**
 * Update profile picture
 */
exports.uploadMissingPeopleImage = function (req, res) {
  upload(req,res,function(err){
    res.json('file is uploaded');
  });

};
/**
 * Create an investigation
 */
exports.create = function (req, res) {
  var missingpeople = new MissingPeople(req.body);
  missingpeople.user = req.user;

  missingpeople.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missingpeople);
    }
  });
};

/**
 * Show the current investigation
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var missingpeople = req.missingpeople ? req.missingpeople.toJSON() : {};

  // Add a custom field to the investigation, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the investigation model.
  missingpeople.isCurrentUserOwner = !!(req.user && missingpeople.user && missingpeople.user._id.toString() === req.user._id.toString());

  res.json(missingpeople);
};

/**
 * Update an investigation
 */
exports.update = function (req, res) {
  var missingpeople = req.missingpeople;

  missingpeople.title = req.body.title;
  missingpeople.station = req.body.station;
  missingpeople.missingPlace = req.body.missingPlace;
  missingpeople.content = req.body.content;
  missingpeople.date = req.body.date;
  missingpeople.firdate = req.body.firdate;
  missingpeople.firnumber = req.body.firnumber;
  missingpeople.profileImageURL = req.body.profileImageURL;

  missingpeople.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missingpeople);
    }
  });
};

/**
 * Delete an investigation
 */
exports.delete = function (req, res) {
  var missingpeople = req.missingpeople;

  missingpeople.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missingpeople);
    }
  });
};

/**
 * List of Investigations
 */
exports.list = function (req, res) {
  MissingPeople.find().sort('-created').populate('user', 'displayName').exec(function (err, missingpeople) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missingpeople);
    }
  });
};
/**
 * List of Investigations
 */
exports.top = function (req, res) {
  MissingPeople.find().sort('-created').limit(3).populate('user', 'displayName').exec(function (err, missingpeople) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(missingpeople);
    }
  });
};
/**
 * Investigation middleware
 */
exports.mPeopleByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Investigation is invalid'
    });
  }

  MissingPeople.findById(id).populate('user', 'displayName').exec(function (err, missingpeople) {
    if (err) {
      return next(err);
    } else if (!missingpeople) {
      return res.status(404).send({
        message: 'No investigation with that identifier has been found'
      });
    }
    req.missingpeople = missingpeople;
    next();
  });
};
