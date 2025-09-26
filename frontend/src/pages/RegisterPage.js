import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import apiFetch from '../api/api';

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (credentials) => {
    try {
      await apiFetch('/auth/register', {
        method: 'POST',
        body: credentials,
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      alert(error.message || 'Registration failed!');
      console.error(error);
    }
  };

  return <AuthForm isLogin={false} onSubmit={handleRegister} />;
};

export default RegisterPage;