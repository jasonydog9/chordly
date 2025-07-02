// db/conn.js - Optimized for AWS Lambda
const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected) {
    console.log('📦 Using existing MongoDB connection');
    return;
  }

  // If connecting, wait for it
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    console.log('📦 MongoDB already connected');
    return;
  }

  try {
    console.log('🌐 Connecting to MongoDB...');
    
    const options = {
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    
    isConnected = true;
    console.log('✅ Connected to MongoDB');
    
    // Handle connection events
    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err);
      isConnected = false;
    });
    
    mongoose.connection.on('disconnected', () => {
      console.log('📡 MongoDB disconnected');
      isConnected = false;
    });
    
    mongoose.connection.on('reconnected', () => {
      console.log('🔄 MongoDB reconnected');
      isConnected = true;
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    isConnected = false;
    throw error;
  }
};

module.exports = connectDB;