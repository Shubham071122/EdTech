const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const auth = require('./src/config/firebaseConfig.js')
// const functions = require('firebase-functions');
const admin = require('firebase-admin');
const brevo = require('@getbrevo/brevo');
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





app.get('/', (req, res) => {
  res.send('wlcome to Edtech');
});

//Routes import
const paymentRoutes = require('./src/routes/paymentRoutes.js');
const AuthRoutes = require('./src/routes/AuthRoutes.js');

//Routes
app.use('/api/v1/payment', paymentRoutes);
app.get('/cancel', async (req, res) => {
  return res.redirect(`${process.env.CLIENT_URL}/payment-cancel`);
});

app.post('/api/v1/user',AuthRoutes) 



app.listen(process.env.PORT || 8000, () => {
  console.log(`✅ server is running at port : ${process.env.PORT} `);
});
