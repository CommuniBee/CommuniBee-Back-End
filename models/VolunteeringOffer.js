
/*!
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * VolunteeringOffer schema
 */
var VolunteeringOfferSchema = new Schema({
  location: {
    type: {
      lat: Number,
      lon: Number
    },
    required: true
  },
  volunteersOffered: {
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
  },
  content: {
    type: Schema.Types.ObjectId,
    ref: 'Content'
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
VolunteeringOfferSchema.method({

});

/**
 * Statics
 */
VolunteeringOfferSchema.static({

});

/**
 * Register
 */
mongoose.model('VolunteeringOffer', VolunteeringOfferSchema);
