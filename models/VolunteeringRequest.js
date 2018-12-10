
/*!
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * VolunteeringRequest schema
 */
var VolunteeringRequestSchema = new Schema({
  location: {
    type: {
      lat: Number,
      lon: Number
    },
    required: true
  },
  volunteersNeeded: {
    type: Number,
    required: true
  },
  occurrences: {
    type: Number,
    required: true
  },
  contact: {
    name:{
      type: String,
      required: true
    },
    phone:{
      type: String,
      required: true
    },
    email:{
      type: String,
      required: true
    }
  },
  dateRange: {
    type: {
      from: Date,
      to: Date
    },
    required: true
  },
  availableDays: {
    type: [Number],
    required: true
  },
  timeRange:  {
    type: {
      from: Date,
      to: Date
    },
    required: true
  },
  notes: {
    type: [String],
    default: []
  }

});

/**
 * Add plugins
 */


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
VolunteeringRequestSchema.method({

});

/**
 * Statics
 */
VolunteeringRequestSchema.static({

});

/**
 * Register
 */
mongoose.model('VolunteeringRequest', VolunteeringRequestSchema);
