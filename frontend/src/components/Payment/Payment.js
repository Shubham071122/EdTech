import React, { useState } from 'react';
import {
  initiatePayPalPayment,
  initiateStripePayment,
} from './PaymentFunction.js';
import { GrPaypal } from 'react-icons/gr';
import { BsStripe } from 'react-icons/bs';

const PaymentPage = () => {
  const [amount] = useState(50);

  const handlePayPalClick = async () => {
    localStorage.setItem('paymentAmount', amount);
    await initiatePayPalPayment(amount);
  };

  const handleStripeClick = async () => {
    localStorage.setItem('paymentAmount', amount);
    await initiateStripePayment(amount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8">Choose Payment Method</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <p className="text-gray-700 mb-4">Total Amount: ${amount}</p>
        <div className="flex flex-col space-y-4">
          {/* PayPal Button */}
          <button
            onClick={handlePayPalClick}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            <GrPaypal className="text-2xl mr-4" />
            Pay with PayPal
          </button>
          {/* Stripe Button */}
          <button
            onClick={handleStripeClick}
            className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            <BsStripe className="text-2xl mr-4" />
            Pay with Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
