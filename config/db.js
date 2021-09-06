import mongoose from 'mongoose';

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/userDB', {
        useNewUrlParser: true
    });
};

export default connectDB;