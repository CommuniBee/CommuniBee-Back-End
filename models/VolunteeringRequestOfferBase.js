const mongoose = require('mongoose');

const options = { discriminatorKey: 'kind' };
const VolunteeringRequestOfferBaseSchema = new mongoose.Schema({
  numberOfVolunteers: {
    type: Number,
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
  dateRange: {
    type: {
      from: Date,
      to: Date,
    },
    required: true,
  },
  availableWeekdays: {
    type: [Number],
    required: true,
  },
  timeRange: {
    type: {
      from: Date,
      to: Date,
    },
    required: true,
  },
  notes: {
    type: [String],
    default: [],
  },
}, options);

VolunteeringRequestOfferBaseSchema.method({
});

VolunteeringRequestOfferBaseSchema.static({
});

module.exports = mongoose.model('VolunteeringRequestOfferBase', VolunteeringRequestOfferBaseSchema);
