const axios = require('axios');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);
const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id: `${process.env.PAYPAL_CLIENT_ID}`,
  client_secret: `${process.env.PAYPAL_SECRET_KEY}`,
});

const processPayPalPayment = async (req, res) => {
  const { amount } = req.body;
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET_KEY;
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

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

    const accessToken = tokenResponse.data.access_token;
    console.log('ac:', accessToken);

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
  console.log('req:', req.query);
  const { paymentId, PayerID } = req.query;
  try {
    const execute_payment_json = {
      payer_id: PayerID,
      transactions: [
        {
          amount: {
            currency: 'USD',
            total: '50.00',
          },
          description: 'This is teh payment description',
        },
      ],
    };
    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error);
          return res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
        } else {
          const response = JSON.stringify(payment);
          const ParesedResponse = JSON.parse(response);
          console.log(ParesedResponse);

          return res.redirect(`${process.env.CLIENT_URL}/payment-success`);
        }
      },
    );
  } catch (error) {
    console.error('Error saving payment details:', error);
    res.status(500).send('Failed to save payment details');
  }
};

const processStripePayment = async (req, res) => {
  const { amount } = req.body;
  const product = await stripe.products.create({
    name: 'Book',
  });
  if (product) {
    var price = await stripe.prices.create({
      product: `${product.id}`,
      unit_amount: amount * 100,
      currency: 'USD',
    });
  }

  if (price.id) {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
      customer_email: 'demo@gmail.com',
    });

    res.json({ url: session.url });
  }
};

module.exports = { processPayPalPayment, processStripePayment, paymentSuccess };
