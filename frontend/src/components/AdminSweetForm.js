import React, { useState } from 'react';
import apiFetch from '../api/api';

const AdminSweetForm = ({ onSweetAdded }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newSweetData = { 
                name, 
                category, 
                price: parseFloat(price), 
                quantity: parseInt(quantity) 
            };
            const response = await apiFetch('/sweets', {
                method: 'POST',
                body: newSweetData,
            });
            onSweetAdded(response);
            setName('');
            setCategory('');
            setPrice('');
            setQuantity('');
        } catch (error) {
            alert(error.message || 'Failed to add sweet.');
            console.error(error);
        }
    };

    return (
        <div className="admin-form-container">
            <h3>Add New Sweet</h3>
            <form onSubmit={handleSubmit} className="admin-form">
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
                <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required step="0.01" />
                <input type="number" placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} required />
                <button type="submit">Add Sweet</button>
            </form>
        </div>
    );
};

export default AdminSweetForm;