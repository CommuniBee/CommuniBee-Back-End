const mongoose = require('mongoose');
const regions = require('../common/regions');
const VolunteeringRequestOfferBase = require('./volunteering-request-offer-base');

const volunteeringOfferSchema = new mongoose.Schema({
  regions: {
    type: [String],
    required: true,
  },
  availableContent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  }
});

module.exports = VolunteeringRequestOfferBase.discriminator('VolunteeringOffer', volunteeringOfferSchema);
