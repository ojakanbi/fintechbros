// Load environment variables at the top
require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// If this file is run directly (not imported), test the connection
if (require.main === module) {
  connectDB()
    .then(() => {
      console.log('✅ Database connection test completed.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('❌ Failed to connect during standalone run.');
      process.exit(1);
    });
}
