var mongoose = require('mongoose');

var volunteeringEventSchema = new mongoose.Schema({
  request: {
    type: Schema.Types.ObjectId,
    ref: 'VolunteeringRequest'
  },
  offer: {
    type: Schema.Types.ObjectId,
    ref: 'VolunteeringOffer'
  },
  date: {
    type: Date,
    required: true
  },
  userInitiated: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  files: {
    type: [String],
    default: []
  }
});

volunteeringEventSchema.method({

});

volunteeringEventSchema.static({

});

mongoose.model('VolunteeringEvent', volunteeringEventSchema);
