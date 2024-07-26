import React from 'react';
import { FaRegCircleXmark } from 'react-icons/fa6';

function PaymentCanclePage() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="w-full flex flex-row justify-center mb-6">
          <FaRegCircleXmark className="text-6xl text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Payment Failed!</h2>
        <p className="text-gray-700">Please try again !!.</p>
        <a href="/dashboard" className="text-blue-400 text-center">
          Back to dashboard !
        </a>
      </div>
    </div>
  );
}

export default PaymentCanclePage;
