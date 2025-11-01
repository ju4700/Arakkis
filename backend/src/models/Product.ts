import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  stock: number;
  images: string[];
  shop: mongoose.Types.ObjectId;
  farmer: mongoose.Types.ObjectId;
  isAvailable: boolean;
  discount?: number;
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'পণ্যের নাম প্রয়োজন'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'পণ্যের বিবরণ প্রয়োজন'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'পণ্যের ধরন প্রয়োজন'],
      enum: [
        'সবজি',
        'ফল',
        'মাছ',
        'মুরগি',
        'ডিম',
        'দুধ',
        'চাল',
        'ডাল',
        'তেল',
        'মসলা',
        'অন্যান্য',
      ],
    },
    price: {
      type: Number,
      required: [true, 'দাম প্রয়োজন'],
      min: 0,
    },
    unit: {
      type: String,
      required: [true, 'একক প্রয়োজন'],
      enum: ['কেজি', 'লিটার', 'পিস', 'ডজন', 'বান্ডিল', 'কেজি/লিটার'],
      default: 'কেজি',
    },
    stock: {
      type: Number,
      required: [true, 'স্টক পরিমাণ প্রয়োজন'],
      min: 0,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    shop: {
      type: Schema.Types.ObjectId,
      ref: 'Shop',
      required: true,
    },
    farmer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
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
  },
  {
    timestamps: true,
  }
);

// Indexes for faster queries
productSchema.index({ shop: 1 });
productSchema.index({ farmer: 1 });
productSchema.index({ category: 1, isAvailable: 1 });
productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model<IProduct>('Product', productSchema);
