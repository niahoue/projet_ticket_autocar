const Booking = require('../models/Booking');
const Trip = require('../models/Trip')

exports.homepage = (req,res)=>{
    res.render('booking',{ title: 'Réservation de billet de voyage' })
};


exports.createBooking = async (req, res) => {
  const { type, company, depart, destination, date, time, passengers, oneway } = req.body;

  try {
    const trip = await Trip.findOne({
      type,
      company,
      'routes.departure': depart,
      'routes.destination': destination
    });

    if (trip) {
      const totalPrice = trip.routes[0].price * passengers; // Calcul du prix total

      const booking = new Booking({
        userId: req.user.id, // ID de l'utilisateur actuellement connecté
        tripId: trip._id,
        passengers,
        totalPrice
      });

      await booking.save();

      // Rediriger l'utilisateur vers une page de confirmation ou afficher un message de succès
      res.render('bookingConfirmation', { title: 'Réservation créée', booking });
    } else {
      res.render('booking-error', { title: 'Erreur de réservation', message: 'Impossible de trouver le trajet correspondant' });
    }
  } catch (error) {
    console.log(error);
    res.render('booking-error', { title: 'Erreur de réservation', message: 'Une erreur s\'est produite lors de la création de la réservation' });
  }
};



