const express = require('express');
const {
  processPayPalPayment,
  processStripePayment,
  paymentSuccess,
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/success', paymentSuccess);
router.post('/paypal', processPayPalPayment);
router.post('/stripe', processStripePayment);

module.exports = router;
