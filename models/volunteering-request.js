const mongoose = require('mongoose');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

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

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringRequest', volunteeringRequestSchema);