const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const userSchema = mongoose.Schema({
  googleId: String,
  name: String,
  imageUrl: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
