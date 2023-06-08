// controllers/locationController.js
const Location = require('../models/Location');

exports.locationForm = (req, res) => {
  res.render('location', { title: 'Location de véhicules' });
};

exports.submitLocation = async (req, res) => {
  try {
    const { vehicle, start_date, end_date, name, email, phone } = req.body;
    const newLocation = new Location({
      vehicle,
      start_date,
      end_date,
      name,
      email,
      phone
    });
    // Enregistrer la location dans la base de données
    await newLocation.save();
    res.render('locationConfirmation', { title: 'Confirmation de location' });
  } catch (error) {
    console.error(error);
    res.render('error', { message: 'Une erreur s\'est produite lors de la soumission de la demande de location.' });
  }
};
