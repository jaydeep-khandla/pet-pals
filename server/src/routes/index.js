const express = require('express');
const router = express.Router();
require('../config/bullmq_worker');
// Import your route handlers here
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
// const adoptionRoutes = require('./adoptionRoutes');
const adminRoutes = require('./adminRoutes');

// Register your routes here
router.use('/api/auth', authRoutes);
router.use('/api/user', userRoutes);
router.use('/api/pets', petRoutes);
// router.use('/api/adoptions', adoptionRoutes);
router.use('/api/admin', adminRoutes);

module.exports = router;