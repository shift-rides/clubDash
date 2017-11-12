const mongoose = require('mongoose');
// const Event = require('./Event');

const userSchema = mongoose.Schema({
  googleId: String,
  name: String,
  imageUrl: String,
  email: String,
  waivers: [mongoose.Schema.Types.ObjectId],
  clubsLeading: [mongoose.Schema.Types.ObjectId],
  eventRegistered:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],
  admin: Boolean,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
