import jwt from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from '../types';

// Generate JWT Token
export const generateToken = (id: string): string => {
    return jwt.sign(
        { id }, 
        process.env.JWT_SECRET as string, 
        { expiresIn: process.env.JWT_EXPIRE || '7d' } as jwt.SignOptions
    );
};

// Send token response
export const sendTokenResponse = (user: IUser, statusCode: number, res: Response): void => {
    // Create token
    const token = generateToken((user._id as any).toString());

    const options = {
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        secure: process.env.NODE_ENV === 'production'
    };

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token,
            user: {
                id: (user._id as any),
                name: user.name,
                email: user.email,
                phone: user.phone,
                userType: user.userType,
                avatar: user.avatar,
                farmDetails: user.userType === 'farmer' ? user.farmDetails : undefined,
                shippingAddresses: user.userType === 'consumer' ? user.shippingAddresses : undefined
            }
        });
};
