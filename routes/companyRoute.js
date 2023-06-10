const express = require('express')
const router = express.Router()
const controller = require('../controllers/companyController');
const {ensureCompanyAuthenticated, forwardCompanyAuthenticated } = require('../config/auth');

router.get('/login',forwardCompanyAuthenticated,controller.companyLogin);
router.post('/login',forwardCompanyAuthenticated,controller.companyPost);

router.get('/register',controller.companyRegister);
router.post('/register',controller.createCompany);


router.get('/logout',controller.logoutCompany);


// Route pour le tableau de bord des compagnies
router.get('/dashboard',ensureCompanyAuthenticated, controller.companyDashboard);
// Route pour la gestion des offres
router.get('/add-trips',controller.getTrip);
router.post('/add-trips',ensureCompanyAuthenticated, controller.submitTrip);
router.get('/manage-trip',ensureCompanyAuthenticated, controller.getManageTrips);
router.get('/edit-trip/:tripId',ensureCompanyAuthenticated, controller.getEditTrip);
router.put('/edit-trip/:tripId',ensureCompanyAuthenticated, controller.postEditTrip);
router.delete('/delete-trip/:tripId',ensureCompanyAuthenticated, controller.getDeleteTrip);


module.exports = router;