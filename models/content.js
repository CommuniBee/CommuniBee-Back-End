const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  files: {
    type: [String],
    required: true,
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

module.exports = mongoose.model('Content', contentSchema);
