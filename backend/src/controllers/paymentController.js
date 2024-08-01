const axios = require('axios');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const paypal = require('paypal-rest-sdk');
const { db } = require('../config/firebaseConfig.js');
const { collection, query, where, getDocs } = require('firebase/firestore');
const { sendPaymentSuccessEmail } = require('../controllers/emailService.js');

paypal.configure({
  mode: 'sandbox',
  client_id: `${process.env.PAYPAL_CLIENT_ID}`,
  client_secret: `${process.env.PAYPAL_SECRET_KEY}`,
});

const processPayPalPayment = async (req, res) => {
  const { email, amount } = req.body;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET_KEY;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

  // console.log("ath:,",auth);

  try {
    const tokenResponse = await axios.post(
      'https://api.sandbox.paypal.com/v1/oauth2/token',
      'grant_type=client_credentials',
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    // console.log("tk:",tokenResponse);

    const accessToken = tokenResponse.data.access_token;
    // console.log('ac:', accessToken);

    const paymentResponse = await axios.post(
      'https://api.sandbox.paypal.com/v1/payments/payment',
      {
        intent: 'sale',
        redirect_urls: {
          return_url: `${process.env.SERVER_URL}/success`,
          cancel_url: `${process.env.SERVER_URL}/cancel`,
        },
        payer: {
          payment_method: 'paypal',
        },
        transactions: [
          {
            amount: {
              total: amount,
              currency: 'USD',
            },
            description: 'EdTech Product Payment',
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const approvalUrl = paymentResponse.data.links.find(
      (link) => link.rel === 'approval_url',
    ).href;
    res.json({ approvalUrl });
  } catch (error) {
    console.error(
      'PayPal Payment Error:',
      error.response ? error.response.data : error.message,
    );
    res.status(500).send('Payment failed');
  }
};

const paymentSuccess = async (req, res) => {
  // console.log('req:', req.query);
  const { paymentId, PayerID } = req.query;
  try {
    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: '0.9',
          },
          description: 'This is teh payment description',
        },
      ],
    };

     // Wrap the paypal.payment.execute call in a Promise
     const executePayment = (paymentId, execute_payment_json) => {
      return new Promise((resolve, reject) => {
        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
          if (error) {
            return reject(error);
          } else {
            return resolve(payment);
          }
        });
      });
    };

    // Execute the PayPal payment
    const payment = await executePayment(paymentId, execute_payment_json);

    // Parse payment response
    const parsedResponse = JSON.parse(JSON.stringify(payment));
    const email = parsedResponse.payer.payer_info.email;

    // Define the amount variable, assuming you have it in the request or define it here
    const amount = parsedResponse.transactions[0].amount.total;

    // Send payment success email
    await sendPaymentSuccessEmail(email, amount);

    console.log(parsedResponse);
    return res.redirect(`${process.env.CLIENT_URL}/payment-success`);
  } catch (error) {
    console.error('Error saving payment details:', error);
    return res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
  }
};

const processStripePayment = async (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const product = await stripe.products.create({
      name: 'Book',
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount * 100,
      currency: 'USD',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      customer_email: 'demo@gmail.com',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const validateCoupon = async (req, res) => {
  const { couponCode } = req.body;

  try {
    const q = query(collection(db, 'coupons'), where('code', '==', couponCode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired coupon code' });
    }

    const couponDoc = querySnapshot.docs[0];
    if (!couponDoc.data().valid) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired coupon code' });
    }

    const discount = couponDoc.data().discount;
    return res.status(200).json({ discount });
  } catch (error) {
    console.error('Error validating coupon code:', error);
    res.status(500).send('Server error');
  }
};

module.exports = {
  processPayPalPayment,
  processStripePayment,
  paymentSuccess,
  validateCoupon,
};
