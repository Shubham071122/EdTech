import React from 'react';
import { IoMdCheckmarkCircle } from 'react-icons/io';

const PaymentSuccessPage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full flex flex-row justify-center mb-6">
          <IoMdCheckmarkCircle className="text-6xl text-green-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
        <p className="text-gray-700">Thank you for your purchase.</p>
        <a href="/dashboard" className="text-blue-400 text-center">
          Back to dashboard !
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
