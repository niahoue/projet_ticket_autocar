const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
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
          items: {
            type: String
          },
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
