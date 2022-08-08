const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  reason: {
    type: mongoose.SchemaTypes.String,
    required: false,
  }
});

module.exports = mongoose.model('msgBls', blacklistSchema);
