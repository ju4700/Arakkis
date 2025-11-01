import mongoose, { Schema, Document } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description: string;
  type: string;
  location: string;
  district: string;
  owner: mongoose.Types.ObjectId;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  nidFront?: string;
  nidBack?: string;
  rating: number;
  totalReviews: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const shopSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'দোকানের নাম প্রয়োজন'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'দোকানের বিবরণ প্রয়োজন'],
      trim: true,
    },
    type: {
      type: String,
      required: [true, 'দোকানের ধরন প্রয়োজন'],
      enum: ['সবজি', 'ফল', 'মাছ', 'মুরগি', 'দুগ্ধজাত', 'শস্য', 'মসলা', 'মিশ্র'],
    },
    location: {
      type: String,
      required: [true, 'অবস্থান প্রয়োজন'],
      trim: true,
    },
    district: {
      type: String,
      required: [true, 'জেলা প্রয়োজন'],
      enum: [
        'ঢাকা',
        'চট্টগ্রাম',
        'রাজশাহী',
        'খুলনা',
        'বরিশাল',
        'সিলেট',
        'রংপুর',
        'ময়মনসিংহ',
        'গাজীপুর',
        'নারায়ণগঞ্জ',
        'কুমিল্লা',
        'ফরিদপুর',
        'যশোর',
        'বগুড়া',
        'দিনাজপুর',
      ],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    nidFront: {
      type: String,
    },
    nidBack: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
shopSchema.index({ owner: 1 });
shopSchema.index({ district: 1, type: 1 });
shopSchema.index({ verificationStatus: 1, isActive: 1 });

export default mongoose.model<IShop>('Shop', shopSchema);
