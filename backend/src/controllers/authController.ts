import { Request, Response } from 'express';
import User from '../models/User';
import { sendTokenResponse } from '../utils/tokenUtils';
import { AuthRequest, IRegisterBody, ILoginBody } from '../types';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request<{}, {}, IRegisterBody>, res: Response): Promise<void> => {
    try {
        const { name, email, phone, password, userType, farmDetails, shippingAddress } = req.body;

        // Check if user exists by phone (email is optional)
        const userExists = await User.findOne({ phone });

        if (userExists) {
            res.status(400).json({
                success: false,
                message: 'এই ফোন নম্বর দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে'
            });
            return;
        }

        // If email is provided, check if it's already used
        if (email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                res.status(400).json({
                    success: false,
                    message: 'এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে'
                });
                return;
            }
        }

        // Create user object
        const userData: any = {
            name,
            phone,
            password,
            userType
        };

        // Add email if provided
        if (email) {
            userData.email = email;
        }

        // Add type-specific data
        if (userType === 'farmer' && farmDetails) {
            userData.farmDetails = farmDetails;
        } else if (userType === 'consumer' && shippingAddress) {
            userData.shippingAddresses = [{ ...shippingAddress, isDefault: true }];
        }

        // Create user
        const user = await User.create(userData);

        // Send token response
        sendTokenResponse(user, 201, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'সার্ভার ত্রুটি',
            error: (error as Error).message
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request<{}, {}, ILoginBody>, res: Response): Promise<void> => {
    try {
        const { phone, password } = req.body;

        // Validate phone & password
        if (!phone || !password) {
            res.status(400).json({
                success: false,
                message: 'ফোন নম্বর এবং পাসওয়ার্ড প্রদান করুন'
            });
            return;
        }

        // Check for user (include password for comparison)
        const user = await User.findOne({ phone }).select('+password');

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'ভুল ফোন নম্বর বা পাসওয়ার্ড'
            });
            return;
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: 'ভুল ফোন নম্বর বা পাসওয়ার্ড'
            });
            return;
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save({ validateBeforeSave: false });

        // Send token response
        sendTokenResponse(user, 200, res);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'সার্ভার ত্রুটি',
            error: (error as Error).message
        });
    }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.user?.id);

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'ব্যবহারকারী পাওয়া যায়নি'
            });
            return;
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType,
                avatar: user.avatar,
                farmDetails: user.userType === 'farmer' ? user.farmDetails : undefined,
                shippingAddresses: user.userType === 'consumer' ? user.shippingAddresses : undefined,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'সার্ভার ত্রুটি',
            error: (error as Error).message
        });
    }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        message: 'সফলভাবে লগআউট হয়েছে'
    });
};

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const fieldsToUpdate: any = {
            name: req.body.name,
            phone: req.body.phone,
            avatar: req.body.avatar
        };

        // Update type-specific fields
        if (req.user?.userType === 'farmer' && req.body.farmDetails) {
            fieldsToUpdate.farmDetails = req.body.farmDetails;
        } else if (req.user?.userType === 'consumer' && req.body.shippingAddresses) {
            fieldsToUpdate.shippingAddresses = req.body.shippingAddresses;
        }

        const user = await User.findByIdAndUpdate(req.user?.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'সার্ভার ত্রুটি',
            error: (error as Error).message
        });
    }
};
