const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/login',adminController.loginPage);
router.get('/register',adminController.registerPage);

// Route d'inscription d'un administrateur
router.post('/register', adminController.registerAdmin);

// Route de connexion d'un administrateur
router.post('/login', adminController.loginAdmin);

// Route pour récupérer les utilisateurs
router.get('/users', adminController.getUsers);
// route pour supprimer un utlisateur
router.delete('/users/:id', adminController.deleteUser);

// Route pour récupérer les compagnies à vérifier
router.get('/verify-company', adminController.getVerifyCompanies);

// Route pour vérifier une compagnie
router.post('/verify-company', adminController.verifyCompany);
//route pour supprimer une compagnie
router.delete('/verify-company/:id', adminController.deleteCompany);


module.exports = router