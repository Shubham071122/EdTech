const axios = require('axios');
const Brevo = require('@getbrevo/brevo');

// Initialize Brevo API client
const apiInstance = new Brevo.TransactionalEmailsApi();
apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Function to send a payment success email
const sendPaymentSuccessEmail = async (email, amount) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail({
      to: [{ email: email }],
      subject: 'Payment Success',
      htmlContent: `<p>Your payment of $${amount} was successful!</p>`,
    });

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {sendPaymentSuccessEmail}

// const brevo = require('@getbrevo/brevo');
// let defaultClient = brevo.ApiClient.instance;

// let apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = 'xkeysib-YOUR_API_KEY';

// let apiInstance = new brevo.TransactionalEmailsApi();
// let sendSmtpEmail = new brevo.SendSmtpEmail();

// sendSmtpEmail.subject = "My {{params.subject}}";
// sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
// sendSmtpEmail.sender = { "name": "John", "email": "example@example.com" };
// sendSmtpEmail.to = [
//   { "email": "example@brevo.com", "name": "sample-name" }
// ];
// sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
// sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
// sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };


// apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
//   console.log('API called successfully. Returned data: ' + JSON.stringify(data));
// }, function (error) {
//   console.error(error);
// });