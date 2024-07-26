import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        {isLogin ? 'Login' : 'Signup'}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          {isLogin ? 'Login' : 'Signup'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={() => navigate(isLogin ? '/signup' : '/login')}
          className="text-blue-500 hover:underline"
        >
          {isLogin
            ? 'Need an account? Signup'
            : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
