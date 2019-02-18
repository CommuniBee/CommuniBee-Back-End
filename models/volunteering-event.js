const mongoose = require('mongoose');

const volunteeringEventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
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
  isDone: {
    type: Boolean,
    default: false,
  },
  createdByUserId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('VolunteeringEvent', volunteeringEventSchema);
