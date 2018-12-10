
/*!
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * VolunteeringEvent schema
 */
var VolunteeringEventSchema = new Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'VolunteeringRequest'
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'VolunteeringOffer'
  },
  date: {
    type: Date,
    required: true
  },
  userInitiated: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  files: {
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
VolunteeringEventSchema.method({

});

/**
 * Statics
 */
VolunteeringEventSchema.static({

});

/**
 * Register
 */
mongoose.model('VolunteeringEvent', VolunteeringEventSchema);
