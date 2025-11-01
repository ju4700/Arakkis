import express from 'express';
import {
  createShop,
  getMyShop,
  getAllShops,
  getShopById,
  updateShop,
  uploadNIDVerification,
  deleteShop,
} from '../controllers/shopController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getAllShops);

// Protected routes (must come before /:id)
router.get('/my/shop', protect, getMyShop);
router.post('/', protect, createShop);
router.patch('/:id', protect, updateShop);
router.post('/:id/verify', protect, uploadNIDVerification);
router.delete('/:id', protect, deleteShop);

// Public route with ID param (must come after specific routes)
router.get('/:id', getShopById);

export default router;
