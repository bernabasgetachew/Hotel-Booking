const express = require('express');
const { createReservation, getUserReservations, getAllReservations } = require('../controllers/reservationController');
const { authenticate } = require('../middleware/authenticateUser');
const router = express.Router();

router.post('/', authenticate, createReservation);
router.get('/user', authenticate, getUserReservations);
router.get('/admin', authenticate, getAllReservations);

module.exports = router;
