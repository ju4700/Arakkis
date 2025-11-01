import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import Shop from '../models/Shop';
import User from '../models/User';

// @desc    Create a new shop
// @route   POST /api/shops
// @access  Private (Farmers only)
export const createShop = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, type, location, district } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'অনুমোদিত নয়' });
    }

    // Check if user is a farmer
    const user = await User.findById(userId);
    if (!user || user.userType !== 'farmer') {
      return res.status(403).json({ message: 'শুধুমাত্র কৃষক দোকান তৈরি করতে পারবেন' });
    }

    // Check if farmer already has a shop
    const existingShop = await Shop.findOne({ owner: userId });
    if (existingShop) {
      return res.status(400).json({ message: 'আপনার ইতিমধ্যে একটি দোকান আছে' });
    }

    // Create shop
    const shop = await Shop.create({
      name,
      description,
      type,
      location,
      district,
      owner: userId,
    });

    res.status(201).json({
      message: 'দোকান সফলভাবে তৈরি হয়েছে',
      shop,
    });
  } catch (error: any) {
    console.error('Create shop error:', error);
    res.status(500).json({ message: 'দোকান তৈরিতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get farmer's shop
// @route   GET /api/shops/my-shop
// @access  Private (Farmers only)
export const getMyShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'অনুমোদিত নয়' });
    }

    const shop = await Shop.findOne({ owner: userId }).populate('owner', 'name email phone');

    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    res.json(shop);
  } catch (error: any) {
    console.error('Get my shop error:', error);
    res.status(500).json({ message: 'দোকান লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get all verified shops
// @route   GET /api/shops
// @access  Public
export const getAllShops = async (req: Request, res: Response) => {
  try {
    const { district, type, page = 1, limit = 12 } = req.query;

    const query: any = { verificationStatus: 'verified', isActive: true };

    if (district) query.district = district;
    if (type) query.type = type;

    const shops = await Shop.find(query)
      .populate('owner', 'name phone')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Shop.countDocuments(query);

    res.json({
      shops,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error: any) {
    console.error('Get shops error:', error);
    res.status(500).json({ message: 'দোকান লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Get shop by ID
// @route   GET /api/shops/:id
// @access  Public
export const getShopById = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findById(req.params.id).populate('owner', 'name phone');

    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    res.json(shop);
  } catch (error: any) {
    console.error('Get shop error:', error);
    res.status(500).json({ message: 'দোকান লোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Update shop
// @route   PATCH /api/shops/:id
// @access  Private (Owner only)
export const updateShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name, description, type, location, district, isActive } = req.body;

    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    // Check if user is the owner
    if (shop.owner.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই দোকান আপডেট করতে পারবেন না' });
    }

    // Update fields
    if (name) shop.name = name;
    if (description) shop.description = description;
    if (type) shop.type = type;
    if (location) shop.location = location;
    if (district) shop.district = district;
    if (typeof isActive !== 'undefined') shop.isActive = isActive;

    await shop.save();

    res.json({
      message: 'দোকান সফলভাবে আপডেট হয়েছে',
      shop,
    });
  } catch (error: any) {
    console.error('Update shop error:', error);
    res.status(500).json({ message: 'দোকান আপডেট করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Upload NID verification documents
// @route   POST /api/shops/:id/verify
// @access  Private (Owner only)
export const uploadNIDVerification = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { nidFront, nidBack } = req.body;

    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    // Check if user is the owner
    if (shop.owner.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই দোকান যাচাই করতে পারবেন না' });
    }

    // Update NID images (in real app, these would be uploaded files)
    if (nidFront) shop.nidFront = nidFront;
    if (nidBack) shop.nidBack = nidBack;

    // For demo purposes, auto-verify. In production, admin would verify
    shop.verificationStatus = 'verified';

    await shop.save();

    res.json({
      message: 'পরিচয়পত্র সফলভাবে আপলোড হয়েছে',
      shop,
    });
  } catch (error: any) {
    console.error('Upload NID error:', error);
    res.status(500).json({ message: 'পরিচয়পত্র আপলোড করতে সমস্যা হয়েছে', error: error.message });
  }
};

// @desc    Delete shop
// @route   DELETE /api/shops/:id
// @access  Private (Owner only)
export const deleteShop = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    const shop = await Shop.findById(req.params.id);

    if (!shop) {
      return res.status(404).json({ message: 'দোকান পাওয়া যায়নি' });
    }

    // Check if user is the owner
    if (shop.owner.toString() !== userId) {
      return res.status(403).json({ message: 'আপনি এই দোকান ডিলিট করতে পারবেন না' });
    }

    await shop.deleteOne();

    res.json({ message: 'দোকান সফলভাবে ডিলিট হয়েছে' });
  } catch (error: any) {
    console.error('Delete shop error:', error);
    res.status(500).json({ message: 'দোকান ডিলিট করতে সমস্যা হয়েছে', error: error.message });
  }
};
