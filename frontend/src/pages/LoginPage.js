import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import apiFetch from '../api/api';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: credentials,
      });
      setAuthData(data.token, data.role);
      navigate('/');
    } catch (error) {
      alert(error.message || 'Login failed!');
      console.error(error);
    }
  };

  return <AuthForm isLogin={true} onSubmit={handleLogin} />;
};

export default LoginPage;