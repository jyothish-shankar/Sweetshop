import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../api/api';
import { useAuth } from '../hooks/useAuth';
import SweetCard from '../components/SweetCard';
import AdminSweetForm from '../components/AdminSweetForm';

const HomePage = () => {
  const [sweets, setSweets] = useState([]);
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth.role === 'admin';

  useEffect(() => {
    if (!auth.token) {
      navigate('/login');
    } else {
      fetchSweets();
    }
  }, [auth.token, navigate]);

  const fetchSweets = async () => {
    try {
      const data = await apiFetch('/sweets');
      setSweets(data);
    } catch (error) {
      console.error('Failed to fetch sweets', error);
      if (error.message?.includes('401')) {
          logout();
          navigate('/login');
      }
    }
  };

  const handlePurchase = (sweetId) => {
    setSweets(prevSweets =>
      prevSweets.map(sweet =>
        sweet.id === sweetId ? { ...sweet, quantity: sweet.quantity - 1 } : sweet
      )
    );
  };
  
  const handleSweetAdded = (newSweet) => {
      setSweets(prevSweets => [...prevSweets, newSweet]);
  };

  const handleDelete = async (sweetId) => {
    if (window.confirm('Are you sure you want to delete this sweet?')) {
        try {
            await apiFetch(`/sweets/${sweetId}`, { method: 'DELETE' });
            setSweets(sweets.filter(s => s.id !== sweetId));
        } catch (error) {
            alert(error.message || 'Failed to delete sweet.');
        }
    }
  };

  return (
    <div className="homepage">
      <header>
        <h1>Welcome to the Sweet Shop!</h1>
        <button onClick={() => { logout(); navigate('/login'); }}>Logout</button>
      </header>
      
      {isAdmin && <AdminSweetForm onSweetAdded={handleSweetAdded} />}
      
      <h2>Available Sweets</h2>
      <div className="sweets-container">
        {sweets.map((sweet) => (
          <SweetCard 
            key={sweet.id} 
            sweet={sweet} 
            onPurchase={handlePurchase} 
            isAdmin={isAdmin} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;