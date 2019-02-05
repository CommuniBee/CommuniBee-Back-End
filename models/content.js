const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
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
