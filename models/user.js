const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  sub_id: {
    type: String,
    unique: true,
    required: true,
  }
});

module.exports = mongoose.model('User', userSchema);
