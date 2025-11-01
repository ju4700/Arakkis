import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    password: string;
    userType: 'farmer' | 'consumer';
    avatar?: string;
    farmDetails?: IFarmDetails;
    shippingAddresses?: IShippingAddress[];
    isActive: boolean;
    lastLogin?: Date;
    createdAt: Date;
    updatedAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IFarmDetails {
    farmName?: string;
    farmLocation?: {
        district?: string;
        upazila?: string;
        village?: string;
        coordinates?: {
            type: string;
            coordinates: number[];
        };
    };
    farmSize?: number;
    crops?: string[];
    verified?: boolean;
}

export interface IShippingAddress {
    addressType: 'home' | 'office' | 'other';
    fullAddress: string;
    district: string;
    upazila: string;
    phone: string;
    isDefault: boolean;
}

export interface AuthRequest extends Request {
    user?: IUser;
}

export interface IRegisterBody {
    name: string;
    email: string;
    phone: string;
    password: string;
    userType: 'farmer' | 'consumer';
    farmDetails?: IFarmDetails;
    shippingAddress?: Omit<IShippingAddress, 'isDefault'>;
}

export interface ILoginBody {
    phone: string;
    password: string;
}
