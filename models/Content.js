
/*!
 * Module dependencies
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * ContentSchema schema
 */
var ContentSchema = new Schema({
  files: {
    type: [String],
    requried: true
  },
  title: {
    type: String,
    required: true
  },
  category: String,
  tags: {
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
ContentSchema.method({

});

/**
 * Statics
 */
ContentSchema.static({

});

/**
 * Register
 */
mongoose.model('Content', ContentSchema);
