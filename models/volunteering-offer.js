const mongoose = require('mongoose');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

const volunteeringOfferSchema = new mongoose.Schema({
  numberOfVolunteers: {
    type: Number,
    default: 1,
  },
});

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringOffer', volunteeringOfferSchema);
