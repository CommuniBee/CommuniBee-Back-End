const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { discriminatorKey: 'kind' };
const VolunteeringRequestOfferBaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  numberOfVolunteers: {
    type: Number,
    default: 1,
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
  availableWeekdays: {
    type: [Number],
    required: true,
  },
  notes: {
    type: [String],
    default: [],
  },
  createdByUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, options);

module.exports = mongoose.model('VolunteeringRequestOfferBase', VolunteeringRequestOfferBaseSchema);
