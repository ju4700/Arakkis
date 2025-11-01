import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const checkUser = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB Connected...');

        const phoneToCheck = '+8801666777888';

        // Check if user exists
        const user = await User.findOne({ phone: phoneToCheck });

        if (user) {
            console.log('\n✅ User found with this phone number:');
            console.log('=====================================');
            console.log('Name:', user.name);
            console.log('Email:', user.email || 'N/A');
            console.log('Phone:', user.phone);
            console.log('Type:', user.userType);
            console.log('Created:', user.createdAt);
            console.log('=====================================\n');

            console.log('Options:');
            console.log('1. Try logging in with this phone number');
            console.log('2. Use a different phone number for registration');
            console.log('3. Delete this user (run: npm run delete-user)');
        } else {
            console.log('\n❌ No user found with phone:', phoneToCheck);
            console.log('You can proceed with registration.\n');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkUser();
