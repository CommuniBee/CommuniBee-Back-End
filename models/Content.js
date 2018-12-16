const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  file: {
    name: {
      type: String,
      required: true,
    },
    buffer: {
      type: mongoose.Schema.Types.Buffer,
      required: true,
    },
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
