const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
});

categorySchema.method({
});

categorySchema.static({
});

module.exports = mongoose.model('Category', categorySchema);
