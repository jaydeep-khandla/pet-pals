const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/verify', authController.verifyOtp);

router.use(verifyToken);

router.get('/refresh', authController.refreshJWToken);

router.get('/logout', authController.logout);

module.exports = router;