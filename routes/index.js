const express = require('express');
const router = express.Router();
const controller = require('../controllers/indexController');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



router.get('/' , controller.homepage);





module.exports= router;