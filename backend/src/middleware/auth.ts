import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../types';

interface JwtPayload {
    id: string;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password') as any;

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'ব্যবহারকারী পাওয়া যায়নি'
                });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({
                success: false,
                message: 'অনুমোদন ব্যর্থ, টোকেন সঠিক নয়'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'অনুমোদন ব্যর্থ, কোন টোকেন নেই'
        });
    }
};

// Restrict to specific user types
export const restrictTo = (...userTypes: Array<'farmer' | 'consumer'>) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !userTypes.includes(req.user.userType)) {
            return res.status(403).json({
                success: false,
                message: 'আপনার এই কাজ করার অনুমতি নেই'
            });
        }
        next();
    };
};
