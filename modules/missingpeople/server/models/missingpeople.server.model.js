'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Crime Schema
 */
var MissingPeopleSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  content: {
    type: String,
    default: '',
    trim: true,
    required: 'Title cannot be blank'
  },
  address: {
    type: String,
    default: '',
    trim: true
  },
  firnumber: {
    type: String,
    default: '',
    trim: true
  },
  firdate:{
    type:Date,
    required: 'Date cannot be blank'

  },
  profileImageURL: {
    type: String
  },
  station: {
    type: String,
    default: '',
    trim: true
  },
  missingPlace:{
    type: String,
    default: '',
    trim: true
  },
  amount:{
    type: Number
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  date:{
    type:Date,
    required: 'Date cannot be blank'

  }
});

mongoose.model('MissingPeople', MissingPeopleSchema);
