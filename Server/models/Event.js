const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  allDay: Boolean,
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  origin: { type: String, enum: ['Brandeis', 'Logan Airport', 'New Jersey', 'New York'] },
  destination: { type: String, enum: ['Brandeis', 'Logan Airport', 'New Jersey', 'New York'] },
  organizer: [mongoose.Schema.Types.ObjectId],
  riders: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      ],
  freeSeats: Number,
  desc: String,
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
