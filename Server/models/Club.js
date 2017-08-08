const mongoose = require('mongoose');

const clubSchema = mongoose.Schema({
  name: String,
  imageUrl: String,
  members: [mongoose.Schema.Types.ObjectId],
});

const Club = mongoose.model('Club', clubSchema);

module.exports = Club;
