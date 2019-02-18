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
  offerReview: {
    rating: Number,
    description: String,
    createdByUserId: String,
  },
  requestReview: {
    rating: Number,
    description: String,
    createdByUserId: String,
  }
});

module.exports = mongoose.model('VolunteeringEvent', volunteeringEventSchema);
