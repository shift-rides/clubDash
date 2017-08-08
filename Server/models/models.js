const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
});

const User = require('./User');
const Waiver = require('./Waiver');
const Club = require('./Club');

module.exports = { User, Waiver, Club };
