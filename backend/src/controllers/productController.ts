import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import Product from '../models/Product';
import Shop from '../models/Shop';

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Farmers only)
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, category, price, unit, stock, images, shopId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'অনুমোদিত নয়' });
    }

    // Verify shop exists and belongs to farmer
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    if (shop.owner.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই দোকানে পণ্য যোগ করতে পারবেন না' });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      category,
      price,
      unit,
      stock,
      images: images || [],
      shop: shopId,
      farmer: userId,
    });

    res.status(201).json({
      message: 'পণ্য সফলভাবে যোগ হয়েছে',
      product,
    });
  } catch (error: any) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'পণ্য যোগ করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get all products (with filters)
// @route   GET /api/products
// @access  Public
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { category, shopId, search, page = 1, limit = 12 } = req.query;

    const query: any = { isAvailable: true };

    if (category) query.category = category;
    if (shopId) query.shop = shopId;
    if (search) {
      query.$text = { $search: search as string };
    }

    const products = await Product.find(query)
      .populate('shop', 'name district type')
      .populate('farmer', 'name phone')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error: any) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'পণ্য লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('shop', 'name district type rating')
      .populate('farmer', 'name phone');

    if (!product) {
      return res.status(404).json({ message: 'পণ্য পাওয়া যায়নি' });
    }

    res.json(product);
  } catch (error: any) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'পণ্য লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get products by shop
// @route   GET /api/shops/:shopId/products
// @access  Public
export const getProductsByShop = async (req: Request, res: Response) => {
  try {
    const { shopId } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const products = await Product.find({ shop: shopId, isAvailable: true })
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Product.countDocuments({ shop: shopId, isAvailable: true });

    res.json({
      products,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error: any) {
    console.error('Get shop products error:', error);
    res.status(500).json({ message: 'পণ্য লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get farmer's products
// @route   GET /api/products/my-products
// @access  Private (Farmers only)
export const getMyProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'অনুমোদিত নয়' });
    }

    const products = await Product.find({ farmer: userId })
      .populate('shop', 'name')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error: any) {
    console.error('Get my products error:', error);
    res.status(500).json({ message: 'পণ্য লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Update product
// @route   PATCH /api/products/:id
// @access  Private (Owner only)
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, description, category, price, unit, stock, images, isAvailable, discount } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'পণ্য পাওয়া যায়নি' });
    }

    // Check if user is the owner
    if (product.farmer.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই পণ্য আপডেট করতে পারবেন না' });
    }

    // Update fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (category) product.category = category;
    if (price) product.price = price;
    if (unit) product.unit = unit;
    if (typeof stock !== 'undefined') product.stock = stock;
    if (images) product.images = images;
    if (typeof isAvailable !== 'undefined') product.isAvailable = isAvailable;
    if (typeof discount !== 'undefined') product.discount = discount;

    await product.save();

    res.json({
      message: 'পণ্য সফলভাবে আপডেট হয়েছে',
      product,
    });
  } catch (error: any) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'পণ্য আপডেট করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Owner only)
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'পণ্য পাওয়া যায়নি' });
    }

    // Check if user is the owner
    if (product.farmer.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই পণ্য ডিলিট করতে পারবেন না' });
    }

    await product.deleteOne();

    res.json({ message: 'পণ্য সফলভাবে ডিলিট হয়েছে' });
  } catch (error: any) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'পণ্য ডিলিট করতে সমস্যা হয়েছে', error: error.message });
  }
};
