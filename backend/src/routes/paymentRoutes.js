const express = require('express');
const {
  processPayPalPayment,
  processStripePayment,
  paymentSuccess,
  validateCoupon,
} = require('../controllers/paymentController');

const router = express.Router();

router.get('/success', paymentSuccess);
router.post('/paypal', processPayPalPayment);
router.post('/stripe', processStripePayment);
router.post('/validate-coupon',validateCoupon);

module.exports = router;
