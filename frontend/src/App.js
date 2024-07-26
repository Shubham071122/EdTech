// src/App.js
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashbord/Dashboard';
import Payment from './components/Payment/Payment';
import LandingPage from './components/LandingPage';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import PaymentSuccessPage from './components/Payment/PaymentSuccessPage';
import PaymentCancelPage from './components/Payment/PaymentCanclePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard/>} />} />
        <Route path="/payment" element={<PrivateRoute element={<Payment/>} />} />
        <Route path="/payment-success" element={<PrivateRoute element={<PaymentSuccessPage/>} />} />
        <Route path="/payment-cancel" element={<PrivateRoute element={<PaymentCancelPage/>} />} />
      </Routes>
    </Router>
  );
}

export default App;
