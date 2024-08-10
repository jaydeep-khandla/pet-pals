const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const verifyToken = require('../middlewares/verifyToken');

router.get('/:id', userController.fetchUser);


module.exports = router;