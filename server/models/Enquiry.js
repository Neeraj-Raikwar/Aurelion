// 1. Mongoose library import ki
const mongoose = require('mongoose');

// 2. Enquiry (lead/contact form) ka schema banaya
const enquirySchema = new mongoose.Schema({
  // User/Customer ka naam (Required field)
  name: {
    type: String,
    required: true
  },

  // User ka email address (Required field)
  email: {
    type: String,
    required: true
  },

  // User ka phone number with custom regex validation
  phone: {
    type: String,
    validate: {
      validator: function(v) {
        // Regex check: Digits, +, spaces, dashes allow karta hai
        return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(v);
      },
      // Agar validation fail hui toh yeh error message aayega
      message: props => `${props.value} is not a valid phone number!`
    }
  },

  // Kis ghadi ke model ke liye enquiry hai (Default 'General' set hai)
  model: {
    type: String,
    default: 'General'
  },

  // Customer ka enquiry message/query (Required field)
  message: {
    type: String,
    required: true
  },

  // Enquiry ka current status: sirf 'new' ya 'contacted' ho sakta hai
  status: {
    type: String,
    enum: ['new', 'contacted'], // Restricted values
    default: 'new'              // Default value 'new' rahegi
  }
}, {
  // Automatically 'createdAt' aur 'updatedAt' track karega
  timestamps: true
});

// 3. Schema ko 'Enquiry' naam ke Model me convert karke export kiya
module.exports = mongoose.model('Enquiry', enquirySchema);
