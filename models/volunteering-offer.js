const mongoose = require('mongoose');
const regions = require('../common/regions');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

const volunteeringOfferSchema = new mongoose.Schema({
  location: {
    type: String,
    enum: regions.getRegions(),
    required: true,
  },
});

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringOffer', volunteeringOfferSchema);