const mongoose = require('mongoose');
const VolunteeringOfferRequestBase = require('./VolunteeringOfferRequestBase');

const volunteeringRequestSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
  },
  numberOfOccurrences: {
    type: Number,
    required: true,
  },
});

volunteeringRequestSchema.method({
});

volunteeringRequestSchema.static({
});

module.exports = VolunteeringOfferRequestBase.discriminator('VolunteeringRequest', volunteeringRequestSchema);
