const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  googleId: String,
  name: String,
  imageUrl: String,
  email: String,
  waivers: [mongoose.Schema.Types.ObjectId],
  clubsLeading: [mongoose.Schema.Types.ObjectId],
  admin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
