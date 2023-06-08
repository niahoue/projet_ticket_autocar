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
router.post('/submit',ensureCompanyAuthenticated, controller.submitTrip);


module.exports = router;