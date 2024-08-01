import React,{axios} from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import AuthForm from './AuthForm';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async (email, password) => {
    console.log('email:', email);
    console.log('password', password);
    console.log('auth', auth);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log('User signed up:', userCredential.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <AuthForm isLogin={false} onSubmit={handleSignup} />
    </div>
  );
};

export default Signup;
