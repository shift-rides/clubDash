const mongoose = require('mongoose');

const waiverSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  year: String,
  gender: String,
});

const Waiver = mongoose.model('Waiver', waiverSchema);

module.exports = Waiver;
