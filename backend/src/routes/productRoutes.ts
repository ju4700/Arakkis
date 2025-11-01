import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByShop,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);
router.get('/shop/:shopId', getProductsByShop);

// Protected routes (must come before /:id)
router.get('/my/products', protect, getMyProducts);
router.post('/', protect, createProduct);
router.patch('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

// Public route with ID param (must come after specific routes)
router.get('/:id', getProductById);

export default router;
