const express = require('express');
const router = express.Router();
const controller = require('../controllers/locationController');

// Affiche le formulaire de location
router.get('/', controller.locationForm);

// Traite la soumission du formulaire de location
router.post('/submit', controller.submitLocation);










module.exports = router;