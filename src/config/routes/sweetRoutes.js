const express = require('express');
const {
  addSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet,
} = require('../controllers/sweetController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// All routes here are protected
router.use(authMiddleware);

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/:id/purchase', purchaseSweet);

// Admin-only routes
router.post('/', adminMiddleware, addSweet);
router.put('/:id', adminMiddleware, updateSweet);
router.delete('/:id', adminMiddleware, deleteSweet);
router.post('/:id/restock', adminMiddleware, restockSweet);

module.exports = router;