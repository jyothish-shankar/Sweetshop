import React from 'react';
import apiFetch from '../api/api';

const SweetCard = ({ sweet, onPurchase, isAdmin, onDelete }) => {
  const handlePurchase = async () => {
    try {
      await apiFetch(`/sweets/${sweet.id}/purchase`, { method: 'POST' });
      onPurchase(sweet.id);
    } catch (error) {
      alert(error.message || 'Failed to purchase sweet.');
      console.error(error);
    }
  };

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ${sweet.price.toFixed(2)}</p>
      <p>In Stock: {sweet.quantity}</p>
      <button onClick={handlePurchase} disabled={sweet.quantity === 0}>
        Purchase
      </button>
      {isAdmin && <button className="delete-btn" onClick={() => onDelete(sweet.id)}>Delete</button>}
    </div>
  );
};

export default SweetCard;