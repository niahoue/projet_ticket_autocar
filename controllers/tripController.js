 const Trip = require('../models/Trip');

// // Affiche le formulaire de recherche de trajets
// exports.showSearchForm = (req, res) => {
//   res.render('searchForm');
// };

// exports.searchTrips = (req, res) => {
//   const { departure, destination, date, company, departureTime } = req.body;

//   // Construisez un objet de filtre pour la recherche en fonction des critères spécifiés
//   const filter = {};

//   if (departure) {
//     filter.departure = departure;
//   }
//   if (destination) {
//     filter.destination = destination;
//   }
//   if (date) {
//     filter.date = date;
//   }
//   if (company) {
//     filter.company = company;
//   }
//   if (departureTime) {
//     filter.departureTime = departureTime;
//   }
//   // Utilisez la méthode Trip.find() pour rechercher les trajets correspondants dans la base de données
//   Trip.find(filter)
//     .then(trips => {
//       // Passez les résultats de la recherche à la vue des résultats de recherche
//       res.render('searchResult', { trips });
//     })
//     .catch(err => {
//       // Gérez les erreurs de manière appropriée (affichez un message d'erreur, redirigez vers une page d'erreur, etc.)
//       console.error(err);
//       res.redirect('/search-trips-error');
//     });
// };


// // Affiche le formulaire de soumission de trajet
// exports.showSubmitForm = (req, res) => {
//   res.render('submitForm');
// };

// // Enregistre un nouveau trajet soumis par une compagnie
// exports.submitTrip = (req, res) => {
//   const { departure, destination, date, departureTime, price, companyId } = req.body;
//   // Créez une nouvelle instance de Trip avec les données soumises
//   const newTrip = new Trip({
//     departure,
//     destination,
//     date,
//     departureTime,
//     price,
//     companyId
//   });
//   newTrip.save()
//     .then(() => {
//       // Redirigez l'utilisateur vers une page de confirmation ou une autre page appropriée
//       res.redirect('/submit-trip-success');
//     })
//     .catch(err => {
//       // Gérez les erreurs de manière appropriée (affichez un message d'erreur, redirigez vers une page d'erreur, etc.)
//       console.error(err);
//       res.redirect('/submit-trip-error');
//     });
// };
////////////////////////////////////////////////////////////////////////////////////////
exports.createTrip = async (req, res) => {
  const { company, type, routes } = req.body;

  try {
    const trip = new Trip({
      company,
      type,
      routes
    });

    await trip.save();
    res.status(201).json({ message: 'Trip created successfully', trip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create trip' });
  }
};

exports.updateTrip = async (req, res) => {
  const { tripId } = req.params;
  const { company, type, routes } = req.body;

  try {
    const trip = await Trip.findByIdAndUpdate(
      tripId,
      { company, type, routes },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip updated successfully', trip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update trip' });
  }
};

exports.deleteTrip = async (req, res) => {
  const { tripId } = req.params;

  try {
    const trip = await Trip.findByIdAndDelete(tripId);

    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }

    res.status(200).json({ message: 'Trip deleted successfully', trip });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete trip' });
  }
};


