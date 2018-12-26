const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  files: {
    type: [{
      name: {
        type: String,
        required: true,
      },
      buffer: {
        type: mongoose.Schema.Types.Buffer,
        required: true,
      },
    }],
    required: true,
    validate: [(array => array.length > 0), 'Files list must not be empty'],
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  tags: {
    type: [String],
    default: [],
  },
});

contentSchema.method({
});

contentSchema.static({
});

module.exports = mongoose.model('Content', contentSchema);
