const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  depart: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  passengers: {
    type: Number,
    required: true
  },
  oneway: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  reservationDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['En attente...', 'Confirmée', 'Annulée'],
    default: 'En attente...'
  }
});


const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;
