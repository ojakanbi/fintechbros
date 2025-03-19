// Mongo db connection 

const mongose = require('mongoose');

const connectDB = async () => { 
    try {
        const conn = await mongose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;

// Only uncomment this if you want to test the database connection

// if (require.main === module) {
//     require('dotenv').config(); // Load env variables when running standalone
  
//     connectDB().then(() => {
//       console.log('Database connection test completed');
//       process.exit(0); // Close the connection and exit
//     });
//   }
  