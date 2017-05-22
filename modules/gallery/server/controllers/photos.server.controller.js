'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Photo = mongoose.model('Photo'),
  config = require(path.resolve('./config/config')),
  multer = require('multer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an photo
 1
exports.create = function (req, res) {
  var photo = new Photo(req.body);
  photo.user = req.user;

  photo.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(photo);
    }
  });
};
/**
 * Update profile picture
 */
exports.create = function (req, res) {
  var user = req.user;

  // Filtering to upload only images
  var multerConfig = config.uploads.gallery.image;
  multerConfig.fileFilter = require(path.resolve('./config/lib/multer')).imageFileFilter;
  var upload = multer(multerConfig).single('newProfilePicture');

  if (user) {
    uploadImage()
      .then(updatePhotos)
      .then(function () {
        res.json(user);
      })
      .catch(function (err) {
        res.status(422).send(err);
      });
  } else {
    res.status(401).send({
      message: 'User is not signed in'
    });
  }


  function uploadImage() {
    return new Promise(function (resolve, reject) {
      upload(req, res, function (uploadError) {
        if (uploadError) {
          reject(errorHandler.getErrorMessage(uploadError));
        } else {
          resolve();
        }
      });
    });
  }
  function updatePhotos() {
    return new Promise(function (resolve, reject) {
      var photo = new Photo(req.body);
      photo.imageURL = config.uploads.gallery.image.dest + req.file.filename;
      photo.save(function (err, theuser) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

};
/**
 * Show the current photo
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var photo = req.photo ? req.photo.toJSON() : {};

  // Add a custom field to the Photo, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Photo model.
  photo.isCurrentUserOwner = !!(req.user && photo.user && photo.user._id.toString() === req.user._id.toString());

  res.json(photo);
};

/**
 * Update an photo
 */
exports.update = function (req, res) {
  var photo = req.photo;

  photo.title = req.body.title;
  photo.content = req.body.content;

  photo.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(photo);
    }
  });
};

/**
 * Delete an photo
 */
exports.delete = function (req, res) {
  var photo = req.photo;

  photo.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(photo);
    }
  });
};

/**
 * List of Photos
 */
exports.list = function (req, res) {
  Photo.find().sort('-created').populate('user', 'displayName').exec(function (err, photos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(photos);
    }
  });
};
/**
 * List of Photos
 */
exports.top = function (req, res) {
  Photo.find().sort('-created').limit(3).populate('user', 'displayName').exec(function (err, photos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(photos);
    }
  });
};
/**
 * Photo middleware
 */
exports.photoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Photo is invalid'
    });
  }

  Photo.findById(id).populate('user', 'displayName').exec(function (err, photo) {
    if (err) {
      return next(err);
    } else if (!photo) {
      return res.status(404).send({
        message: 'No photo with that identifier has been found'
      });
    }
    req.photo = photo;
    next();
  });
};
