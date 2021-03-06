'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Contact = mongoose.model('Contact'),
  config = require(path.resolve('./config/config')),
  nodemailer = require('nodemailer'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var smtpTransport = nodemailer.createTransport(config.mailer.options);

/**
 * Create an contact
 */
exports.sendmessage = function (req, res) {

  var mailOptions = {
    to: 'ravikumargh13@gmail.com',
    from: 'ravikumar.gh@excelindia.com',
    subject: 'hi',
    html: 'testing'
  };
  console.log(req.body);
  smtpTransport.sendMail(mailOptions, function (err) {
    if (!err) {
      res.send({
        message: 'An email has been sent to the provided email with further instructions.'
      });
    } else {
      return res.status(400).send({
        message: 'Failure sending email'
      });
    }

    done(err);
  });
};

/**
 * Create an contact
 */
exports.create = function (req, res) {
  var contact = new Contact(req.body);
  contact.user = req.user;

  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * Show the current contact
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var contact = req.contact ? req.contact.toJSON() : {};

  // Add a custom field to the Contact, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Contact model.
  contact.isCurrentUserOwner = !!(req.user && contact.user && contact.user._id.toString() === req.user._id.toString());

  res.json(contact);
};

/**
 * Update an contact
 */
exports.update = function (req, res) {
  var contact = req.contact;

  contact.title = req.body.title;
  contact.content = req.body.content;

  contact.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * Delete an contact
 */
exports.delete = function (req, res) {
  var contact = req.contact;

  contact.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contact);
    }
  });
};

/**
 * List of Contacts
 */
exports.list = function (req, res) {
  Contact.find().sort('-created').populate('user', 'displayName').exec(function (err, contacts) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(contacts);
    }
  });
};

/**
 * Contact middleware
 */
exports.contactByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Contact is invalid'
    });
  }

  Contact.findById(id).populate('user', 'displayName').exec(function (err, contact) {
    if (err) {
      return next(err);
    } else if (!contact) {
      return res.status(404).send({
        message: 'No contact with that identifier has been found'
      });
    }
    req.contact = contact;
    next();
  });
};
