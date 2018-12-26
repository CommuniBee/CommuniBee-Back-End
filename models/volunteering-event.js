const mongoose = require('mongoose');

const volunteeringEventSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteeringRequestOfferBase',
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteeringRequestOfferBase',
  },
  date: {
    type: Date,
    required: true,
  },
  userInitiated: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  files: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model('VolunteeringEvent', volunteeringEventSchema);
