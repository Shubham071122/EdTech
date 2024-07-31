import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = ({ getDiscountAmt }) => {
  const [couponCode, setCouponCode] = useState('');

  const handleCouponCodeChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/payment/validate-coupon`,
        { couponCode },
      );
      if (response.data) {
        getDiscountAmt(response.data.discount);
        alert('✅ Token Applied!');
      } else {
        alert('⚠️ Invalid token!', response.message);
      }
    } catch (error) {
      alert('⚠️ Invalid token!');
      console.error('Error applying coupon code:', error);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        value={couponCode}
        onChange={handleCouponCodeChange}
        placeholder="Enter coupon code"
        className="p-1 border rounded-md bg-slate-200"
      />
      <button
        onClick={handleApplyCoupon}
        className="ml-2 px-2 py-1 bg-blue-500 text-white rounded-md"
      >
        Apply Coupon
      </button>
    </div>
  );
};

export default PaymentForm;
