const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const {forwardAuthenticated, ensureAuthenticated } = require('../config/auth');

router.get('/login',forwardAuthenticated,controller.login);
router.get('/register',forwardAuthenticated,controller.getRegister);

router.post('/login',controller.loginPost);
router.post('/register',controller.registerPost);

router.get('/logout',controller.logoutUser);

router.get('/dashboard',ensureAuthenticated,controller.dashboard);

module.exports = router