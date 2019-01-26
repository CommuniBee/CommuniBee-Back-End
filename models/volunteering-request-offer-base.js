const { Schema, model } = require('mongoose');

const options = { discriminatorKey: 'kind' };
const VolunteeringRequestOfferBaseSchema = new Schema({
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

module.exports = model('VolunteeringRequestOfferBase', VolunteeringRequestOfferBaseSchema);
