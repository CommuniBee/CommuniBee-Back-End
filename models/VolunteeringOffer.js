const mongoose = require('mongoose');
const regions = require('../common/regions');
const VolunteeringRequestOfferBase = require('./VolunteeringRequestOfferBase');

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

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringOffer', volunteeringOfferSchema);
