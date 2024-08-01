const axios = require('axios');
const Brevo = require('@getbrevo/brevo');

const SibApiV3Sdk = require('@getbrevo/brevo');
let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = `${process.env.BREVO_API_KEY}`;

const sendPaymentSuccessEmail = async (email, amount) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = 'Product Purchase';
  (sendSmtpEmail.htmlContent = `<p>Your payment of $${amount} was successful!</p>`), 
    (sendSmtpEmail.sender = {
      name: 'ED Tech',
      email: 'shubhamkumar.work3@gmail.com',
    });
  sendSmtpEmail.to = [{ email: email }];

  await apiInstance.sendTransacEmail(sendSmtpEmail);
};
module.exports = { sendPaymentSuccessEmail };

