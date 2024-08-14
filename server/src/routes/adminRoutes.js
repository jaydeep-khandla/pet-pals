const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users', adminController.getAllUsers);

router.delete('/users/:id', adminController.deleteUser);

router.get('/pets', adminController.getAllPets);

router.delete('/pets/:id', adminController.deletePet);

router.get('/users/count', adminController.getUserCount);

router.get('/pets/count', adminController.getPetCount);

// router.get('/adoption-applications/count', adminController.getAdoptionCount);

module.exports = router;