import axios from 'axios';

export const initiatePayPalPayment = async (amount) => {
  try {
    const email = localStorage.getItem('email');
    console.log("e:",process.env.REACT_APP_SERVER_URL)
    await axios
      .post(`${process.env.REACT_APP_SERVER_URL}/payment/paypal`, { email,amount })
      .then((res) => {
        console.log('res:', res);
        window.location.href = res.data.approvalUrl;
      });
  } catch (error) {
    console.error('Error initiating PayPal payment:', error);
  }
};

export const initiateStripePayment = async (amount) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/payment/stripe`,
      { amount },
    );
    console.log("stres:",response);
    if (response.status === 200) {
      window.location.href = response.data.url;
    }
  } catch (error) {
    console.error('Error initiating Stripe payment:', error);
  }
};
