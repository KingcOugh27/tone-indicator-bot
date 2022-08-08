const mongoose = require('mongoose');

const cooldownSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  timestamp: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  control: {
    type:  mongoose.SchemaTypes.String,
    required: true,
  }
});

module.exports = mongoose.model('cooldownSchema', cooldownSchema);