// 1. Mongoose library ko import kiya (MongoDB ke saath interact karne ke liye)
const mongoose = require('mongoose');

// 2. Database se connect karne ke liye asynchronous function banaya
const connectDB = async () => {
  try {
    // 3. .env file se MONGO_URI string lekar MongoDB se connection banaya
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // 4. Terminal par host print karega (e.g. cluster0.mongodb.net ya localhost)
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // 5. Connected database ka exact naam print karega
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    // 6. Agar connection me koi issue aaya toh error message print hoga
    console.error(`Error: ${error.message}`);

    // 7. DB connect na hone par poore Node.js process/server ko turant band (exit) kar dega
    process.exit(1); // 1 ka matlab failure ke saath exit
  }
};

// 8. Is function ko export kiya taaki server.js me connectDB() ko call kar sakein
module.exports = connectDB;
