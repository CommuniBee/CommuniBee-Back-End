
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  displayName: {
    type: String,
    requried: true
  }
});

categorySchema.method({

});

categorySchema.static({

});

mongoose.model('Category', categorySchema);
