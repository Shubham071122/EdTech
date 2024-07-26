const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const app = express();

require('dotenv').config({ path: './.env' });

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['POST', 'GET', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookies', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
    credentials: true,
  }),
);
app.use(bodyParser.json());

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ server is running at port : ${process.env.PORT} `);
});

app.get('/', (req, res) => {
  res.send('wlcome to streamify');
});

//Routes import
const paymentRoutes = require('./src/routes/paymentRoutes.js');

//Routes
app.use('/api/v1/payment', paymentRoutes);
app.get('/cancel', async (req, res) => {
  return res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
});
