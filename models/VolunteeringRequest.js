const mongoose = require('mongoose');
const VolunteeringRequestOfferBase = require('./VolunteeringRequestOfferBase');

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

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringRequest', volunteeringRequestSchema);
