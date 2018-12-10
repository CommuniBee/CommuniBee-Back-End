
/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * User schema
 */
var UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: [{
      type: String
    }],
    default: ['User']
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
UserSchema.method({

});

/**
 * Statics
 */
UserSchema.static({

});

/**
 * Register
 */
mongoose.model('User', UserSchema);
