const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['national', 'international'],
    required: true
  },
  routes: {
    type: Array,
    of: {
      type: Object,
      required: true,
      properties: {
        departure: {
          type: String,
          required: true
        },
        arrival: {
          type: String,
          required: true
        },
        time: {
          type: Array,
          of: String,
          required: true
        },
        price: {
          type: Number,
          required: true
        }
      }
    }
  }
});

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;

