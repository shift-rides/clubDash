const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
});

const userSchema = mongoose.Schema({
  googleId: String,
  name: String,
  imageUrl: String,
  email: String,
  waivers: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
