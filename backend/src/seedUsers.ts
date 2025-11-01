import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const seedUsers = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB Connected...');

        // Clear existing users (optional - comment out if you want to keep existing users)
        // await User.deleteMany({});
        // console.log('Cleared existing users');

        // Demo users
        const demoUsers = [
            {
                name: 'রহিম কৃষক',
                email: 'farmer@demo.com',
                phone: '+8801711111111',
                password: 'password123',
                userType: 'farmer',
                farmDetails: {
                    farmName: 'রহিম ফার্ম',
                    farmLocation: {
                        district: 'ঢাকা',
                        upazila: 'সাভার',
                        village: 'বিরুলিয়া'
                    },
                    farmSize: 5,
                    crops: ['ধান', 'গম', 'সবজি'],
                    verified: true
                }
            },
            {
                name: 'করিম ক্রেতা',
                email: 'consumer@demo.com',
                phone: '+8801722222222',
                password: 'password123',
                userType: 'consumer',
                shippingAddresses: [
                    {
                        addressType: 'home',
                        fullAddress: 'বাড়ি ১২, রোড ৫, ধানমন্ডি',
                        district: 'ঢাকা',
                        upazila: 'ধানমন্ডি',
                        phone: '+8801722222222',
                        isDefault: true
                    }
                ]
            },
            {
                name: 'আলম ফার্মার',
                email: 'farmer2@demo.com',
                phone: '+8801733333333',
                password: 'password123',
                userType: 'farmer',
                farmDetails: {
                    farmName: 'আলম এগ্রো',
                    farmLocation: {
                        district: 'চট্টগ্রাম',
                        upazila: 'পটিয়া',
                        village: 'কলাউজান'
                    },
                    farmSize: 10,
                    crops: ['টমেটো', 'মরিচ', 'বেগুন'],
                    verified: true
                }
            },
            {
                name: 'সালমা বেগম',
                email: 'consumer2@demo.com',
                phone: '+8801744444444',
                password: 'password123',
                userType: 'consumer',
                shippingAddresses: [
                    {
                        addressType: 'office',
                        fullAddress: 'অফিস ২, গুলশান ১',
                        district: 'ঢাকা',
                        upazila: 'গুলশান',
                        phone: '+8801744444444',
                        isDefault: true
                    }
                ]
            }
        ];

        // Create users
        for (const userData of demoUsers) {
            const existingUser = await User.findOne({ phone: userData.phone });
            if (existingUser) {
                console.log(`User already exists: ${userData.name} (${userData.phone})`);
            } else {
                await User.create(userData);
                console.log(`Created user: ${userData.name} (${userData.phone})`);
            }
        }

        console.log('\n✅ Demo users seeded successfully!');
        console.log('\nDemo Credentials:');
        console.log('=====================================');
        console.log('Farmer 1:');
        console.log('  Phone: +8801711111111');
        console.log('  Password: password123');
        console.log('\nConsumer 1:');
        console.log('  Phone: +8801722222222');
        console.log('  Password: password123');
        console.log('\nFarmer 2:');
        console.log('  Phone: +8801733333333');
        console.log('  Password: password123');
        console.log('\nConsumer 2:');
        console.log('  Phone: +8801744444444');
        console.log('  Password: password123');
        console.log('=====================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
