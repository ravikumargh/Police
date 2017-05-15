'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Announcement Schema
 */
var AnnouncementSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  displaydate: {
    type: Date,
    default: Date.now
  },
  content: {
    type: String,
    default: '',
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Announcement', AnnouncementSchema);
