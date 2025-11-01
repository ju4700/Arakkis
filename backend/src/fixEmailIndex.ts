import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const fixEmailIndex = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('MongoDB Connected...');

        const db = mongoose.connection.db;
        const usersCollection = db?.collection('users');

        if (!usersCollection) {
            throw new Error('Users collection not found');
        }

        console.log('Checking existing indexes...');
        const indexes = await usersCollection.indexes();
        console.log('Current indexes:', JSON.stringify(indexes, null, 2));

        // Drop the email index if it exists
        try {
            await usersCollection.dropIndex('email_1');
            console.log('✅ Dropped old email_1 index');
        } catch (error: any) {
            if (error.code === 27) {
                console.log('ℹ️  email_1 index does not exist');
            } else {
                throw error;
            }
        }

        // Create new sparse unique index for email
        await usersCollection.createIndex(
            { email: 1 }, 
            { unique: true, sparse: true, name: 'email_1' }
        );
        console.log('✅ Created new sparse unique index for email');

        console.log('\nVerifying new indexes...');
        const newIndexes = await usersCollection.indexes();
        console.log('Updated indexes:', JSON.stringify(newIndexes, null, 2));

        console.log('\n🎉 Email index fixed! Users without email can now register.');

        process.exit(0);
    } catch (error) {
        console.error('Error fixing index:', error);
        process.exit(1);
    }
};

fixEmailIndex();
