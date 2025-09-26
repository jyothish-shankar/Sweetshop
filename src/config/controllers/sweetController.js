const { Sweet } = require('../models');
const { Op } = require('sequelize');

// Create a new sweet (Admin only)
const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const newSweet = await Sweet.create({ name, category, price, quantity });
    res.status(201).json(newSweet);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all sweets
const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.findAll();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Search sweets
const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const whereClause = {};

    if (name) whereClause.name = { [Op.like]: `%${name}%` };
    if (category) whereClause.category = { [Op.like]: `%${category}%` };
    if (minPrice) whereClause.price = { ...whereClause.price, [Op.gte]: parseFloat(minPrice) };
    if (maxPrice) whereClause.price = { ...whereClause.price, [Op.lte]: parseFloat(maxPrice) };

    const sweets = await Sweet.findAll({ where: whereClause });
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a sweet (Admin only)
const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Sweet.update(req.body, { where: { id } });
    if (updated) {
      const updatedSweet = await Sweet.findByPk(id);
      return res.status(200).json(updatedSweet);
    }
    throw new Error('Sweet not found');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a sweet (Admin only)
const deleteSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sweet.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error('Sweet not found');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Purchase a sweet
const purchaseSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByPk(id);
    if (!sweet) {
      return res.status(404).json({ message: 'Sweet not found' });
    }
    if (sweet.quantity <= 0) {
      return res.status(400).json({ message: 'Sweet is out of stock' });
    }
    sweet.quantity -= 1;
    await sweet.save();
    res.json({ message: 'Purchase successful', sweet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Restock a sweet (Admin only)
const restockSweet = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        if (!quantity || quantity <= 0) {
            return res.status(400).json({ message: 'Restock quantity must be positive' });
        }
        const sweet = await Sweet.findByPk(id);
        if (!sweet) {
            return res.status(404).json({ message: 'Sweet not found' });
        }
        sweet.quantity += quantity;
        await sweet.save();
        res.json({ message: 'Restock successful', sweet });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
};