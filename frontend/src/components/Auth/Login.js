import React,{axios} from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('response:', response);
      const token = response.user.accessToken;
      localStorage.setItem('token', token);
      const Email = email;
        localStorage.setItem('email',Email);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm isLogin={true} onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
