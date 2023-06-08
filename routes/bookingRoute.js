const express = require('express');
const router = express.Router();
const controller = require('../controllers/bookingController');


router.get('/', controller.homepage);
router.post('/submit',controller.createBooking);




module.exports = router;