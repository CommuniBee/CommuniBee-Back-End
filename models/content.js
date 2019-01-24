const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  file: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: false,
    default: '',
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
