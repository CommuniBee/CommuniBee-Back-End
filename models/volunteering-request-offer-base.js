const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };
const VolunteeringRequestOfferBaseSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
  },
  contact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  multiOccurrence: {
    type: Boolean,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
  },
  regions: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubRegion',
      },
    ],
    required: true,
  },
  createdByUserId: {
    type: String,
    required: true,
  },
}, options);

module.exports = mongoose.model('VolunteeringRequestOfferBase', VolunteeringRequestOfferBaseSchema);
