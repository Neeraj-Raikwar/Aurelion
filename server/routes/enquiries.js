// 1. Express framework ko import kiya
const express = require('express');

// 2. Express ka Router instance banaya (routes define karne ke liye)
const router = express.Router();

// 3. Controller se business logic wale do functions import kiye
const { createEnquiry, getEnquiries } = require('../controllers/enquiryController');

// 4. Middleware se validation rules aur validator check function import kiya
const { enquiryValidationRules, validate } = require('../middleware/validate');

// 5. POST request route ('/api/enquiries'):
//    - Pehle data validate hoga (enquiryValidationRules, validate)
//    - Agar data valid hai, tabhi createEnquiry controller chalega
router.post('/', enquiryValidationRules, validate, createEnquiry);

// 6. GET request route ('/api/enquiries'): Saari enquiries fetch karne ke liye
router.get('/', getEnquiries);

// 7. Router ko export kiya taaki server.js isko use kar sake
module.exports = router;
