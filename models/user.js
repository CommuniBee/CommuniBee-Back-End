const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: [{
      type: String,
    }],
    default: ['User'],
  },
});

module.exports = mongoose.model('User', UserSchema);
