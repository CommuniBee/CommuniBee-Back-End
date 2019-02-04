const mongoose = require('mongoose');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

const volunteeringRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
});

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringRequest', volunteeringRequestSchema);
