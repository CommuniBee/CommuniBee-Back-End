const mongoose = require('mongoose');

const subRegionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Region',
  },
});

module.exports = mongoose.model('SubRegion', subRegionSchema);
