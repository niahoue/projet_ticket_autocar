const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth');
const controller = require('../controllers/tripController')


// // Affiche le formulaire de recherche de trajets
// router.get('/search', controller.showSearchForm);

// // Traite la recherche de trajets et affiche les résultats
// router.post('/search', controller.searchTrips);

// // Affiche le formulaire de soumission de trajet
// router.get('/submit', controller.showSubmitForm);

// // Enregistre un nouveau trajet soumis par une compagnie
// router.post('/submit', controller.submitTrip);

// Créer un voyage
router.post('/', controller.createTrip);

// Mettre à jour un voyage
router.put('/:id', controller.updateTrip);

// Supprimer un voyage
router.delete('/:id', controller.deleteTrip);

module.exports = router