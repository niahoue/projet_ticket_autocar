const express = require('express');
const router = express.Router();
const controller = require('../controllers/contactController')


// Route pour la page de contact
router.get('/',controller.getContactForm );

// Route pour la soumission du formulaire de contact
router.post('/submit', controller.postContactForm);

//stocker la soumission dans la base de donnée
router.post('/submit', controller.saveMessage);
  
  module.exports = router;
  