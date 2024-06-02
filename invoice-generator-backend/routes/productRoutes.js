const express = require('express');
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addProduct).get(protect, getProducts);
router
  .route('/:id')
  .get(protect, getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
