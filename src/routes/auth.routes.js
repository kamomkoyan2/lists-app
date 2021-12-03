const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller')


router.post('/login', authController.authenticateSchema, authController.login);
router.post('/register', authController.registerSchema, authController.register);



module.exports =  router;
