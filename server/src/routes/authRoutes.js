const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.get('/verify', authController.verifyOtp);


router.get('/refresh', verifyToken, authController.refreshJWToken);

router.get('/logout', verifyToken, authController.logout);

module.exports = router;