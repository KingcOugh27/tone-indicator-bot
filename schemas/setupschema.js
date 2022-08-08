const mongoose = require('mongoose');

const setupSchema = new mongoose.Schema({
  serverID: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  channelID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model('guildSettings', setupSchema);