const mongoose = require('mongoose');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

const volunteeringRequestSchema = new mongoose.Schema({
  about: {
    type: String,
  },
});

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringRequest', volunteeringRequestSchema);
