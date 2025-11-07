const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');
const { authorize } = require('../middlewares/auth.middleware');

router.post('/', authorize, reservationController.addReservation);
router.get('/', authorize, reservationController.getAllReservations);
router.get('/user/:userID', authorize, reservationController.reservationsByUser);
router.put('/cancel/:id', authorize, reservationController.cancelReservation);

module.exports = router;
