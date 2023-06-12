const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//Register
router.post('/register', authController.register)

//Login
router.post('/login', authController.login)

//Logout
router.post('/logout', authController.logout)

//RefreshToken
router.post('/refreshToken', authController.refreshToken)

module.exports = router;