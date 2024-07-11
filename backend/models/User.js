const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    savedLocations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Location' }],
  });
const User = mongoose.model('User', UserSchema);
module.exports = User;