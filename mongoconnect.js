const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); 
  }
};

module.exports = connectToDB;
