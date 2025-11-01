import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'নাম আবশ্যক'],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'একটি বৈধ ইমেইল দিন']
    },
    phone: {
        type: String,
        required: [true, 'ফোন নম্বর আবশ্যক'],
        unique: true,
        match: [/^(\+880|880)?1[3-9]\d{8}$/, 'একটি বৈধ বাংলাদেশী ফোন নম্বর দিন']
    },
    password: {
        type: String,
        required: [true, 'পাসওয়ার্ড আবশ্যক'],
        minlength: [6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে'],
        select: false
    },
    userType: {
        type: String,
        enum: ['farmer', 'consumer'],
        required: [true, 'ব্যবহারকারীর ধরন নির্বাচন করুন'],
        default: 'consumer'
    },
    avatar: {
        type: String,
        default: 'https://via.placeholder.com/150'
    },
    // Farmer specific fields
    farmDetails: {
        farmName: String,
        farmLocation: {
            district: String,
            upazila: String,
            village: String,
            coordinates: {
                type: {
                    type: String,
                    enum: ['Point'],
                    default: 'Point'
                },
                coordinates: {
                    type: [Number],
                    default: [0, 0]
                }
            }
        },
        farmSize: Number,
        crops: [String],
        verified: {
            type: Boolean,
            default: false
        }
    },
    // Consumer specific fields
    shippingAddresses: [{
        addressType: {
            type: String,
            enum: ['home', 'office', 'other'],
            default: 'home'
        },
        fullAddress: String,
        district: String,
        upazila: String,
        phone: String,
        isDefault: {
            type: Boolean,
            default: false
        }
    }],
    // Common fields
    isActive: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Encrypt password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password method
userSchema.methods.matchPassword = async function(enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>('User', userSchema);

export default User;
