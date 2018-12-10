
var mongoose = require('mongoose');

var contentSchema = new mongoose.Schema({
  files: {
    type: [String],
    requried: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: {
    type: [String],
    default: []
  }
});

contentSchema.method({

});

contentSchema.static({

});

mongoose.model('Content', contentSchema);
