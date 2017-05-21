'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Crime Schema
 */
var InvestigationSchema = new Schema({
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
  case:{
    type: String,
    default: '',
    trim: true
  },
  amount:{
    type: Number
  },
  vehicleInfo:{
    type: String,
    default: ''
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

mongoose.model('Investigation', InvestigationSchema);
