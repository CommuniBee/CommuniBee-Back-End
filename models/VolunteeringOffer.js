const mongoose = require('mongoose');
const regions = require('../common/regions');
const VolunteeringOfferRequestBase = require('./VolunteeringOfferRequestBase');

const volunteeringOfferSchema = new mongoose.Schema({
  location: {
    type: String,
    enum: regions.getRegions(),
    required: true,
  },
});

volunteeringOfferSchema.method({
});

volunteeringOfferSchema.static({
});

module.exports = VolunteeringOfferRequestBase.discriminator('VolunteeringOffer', volunteeringOfferSchema);