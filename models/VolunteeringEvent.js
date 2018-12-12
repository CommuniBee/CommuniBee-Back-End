const mongoose = require('mongoose');

const volunteeringEventSchema = new mongoose.Schema({
  request: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteeringOfferRequestBase',
  },
  offer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteeringOfferRequestBase',
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

volunteeringEventSchema.method({
});

volunteeringEventSchema.static({
});

module.exports = mongoose.model('VolunteeringEvent', volunteeringEventSchema);
