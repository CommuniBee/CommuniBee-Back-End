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
  createdByUserId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('VolunteeringEvent', volunteeringEventSchema);
