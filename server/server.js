// 1. Express framework ko import kiya (server banane aur APIs handle karne ke liye)
const express = require('express');

// 2. dotenv import kiya (.env file se secret variables load karne ke liye)
const dotenv = require('dotenv');

// 3. cors import kiya (frontend aur backend ke beech connection allow karne ke liye)
const cors = require('cors');

// 4. Database connection function ko import kiya
const connectDB = require('./config/db');

// 5. Custom error handling middleware ko import kiya
const errorHandler = require('./middleware/errorHandler');

// 6. .env file ke variables (jaise PORT, DB URL) ko process.env me load kiya
dotenv.config();

// 7. Database se connect karne wala function call kiya
connectDB();

// 8. Express application ka main instance (app) banaya
const app = express();

// 9. CORS enable kiya taaki frontend se API call block na ho
app.use(cors());

// 10. Request body me aane wale JSON data ko padhne (parse karne) ke liye
app.use(express.json());

// 11. Test/Health check route - check karne ke liye ki API live hai ya nahi
app.get('/', (req, res) => {
  res.send('Aurelion API is running...');
});

// 12. '/api/watches' se aane wali saari requests 'routes/watches.js' file me bhej di
app.use('/api/watches', require('./routes/watches'));

// 13. '/api/enquiries' se aane wali saari requests 'routes/enquiries.js' file me bhej di
app.use('/api/enquiries', require('./routes/enquiries'));

// 14. Global Error Handler - kisi bhi route me error aaye toh yahan catch hoga (hamesha routes ke baad lagta hai)
app.use(errorHandler);

// 15. Port set kiya: agar .env me PORT hai toh wo, warna default 5000
const PORT = process.env.PORT || 5000;

// 16. Server ko port par chalu (listen) kar diya
app.listen(PORT, () => {
  console.log(`Aurelion Server is running on port ${PORT}`);
});
