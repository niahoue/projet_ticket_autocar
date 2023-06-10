const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { resetPasswordForm, resetPassword, resetPasswordRequestForm, resetPasswordRequest } = require('../controllers/authController');
const {forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

router.get('/login',forwardAuthenticated,controller.login);
router.get('/register',forwardAuthenticated,controller.getRegister);

router.post('/login',controller.loginPost);
router.post('/register',controller.registerPost);

router.get('/logout',controller.logoutUser);

router.get('/dashboard',ensureAuthenticated,controller.dashboard);

// Afficher le formulaire de demande de réinitialisation du mot de passe
router.get('/reset-password-request', resetPasswordRequestForm);

// Soumettre la demande de réinitialisation du mot de passe
router.post('/reset-password-request', resetPasswordRequest);

// Afficher le formulaire de réinitialisation du mot de passe
router.get('/reset-password/:token', resetPasswordForm);

// Réinitialiser le mot de passe
router.post('/reset-password/:token', resetPassword);



router.get('/booking', controller.homepage);
router.post('/booking',controller.createBooking);
router.get('/confirmation/:bookingId',ensureAuthenticated,controller.showConfirmationPage);


module.exports = router