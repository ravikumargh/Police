'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Crime Schema
 */
var CrimeSchema = new Schema({
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
  station: {
    type: String,
    default: '',
    trim: true
  },
  content:{
    type: String,
    default: '',
    trim: true
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

mongoose.model('Crime', CrimeSchema);
