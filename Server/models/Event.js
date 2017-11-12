const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  name: String,
  allDay: Boolean,
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  startLoc: { type: String, enum: ['Brandeis', 'Logan', 'New Jersey', 'New York'] },
  destination: { type: String, enum: ['Brandeis', 'Logan', 'New Jersey', 'New York'] },
  driver: [mongoose.Schema.Types.ObjectId],
  occupiedSeats:Number,
  totalSeats: Number,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
