// 1. Mongoose import kiya (schema aur model define karne ke liye)
const mongoose = require('mongoose');

// 2. Watch data ka blueprint (Structure/Schema) banaya
const watchSchema = new mongoose.Schema({
  // URL-friendly unique identifier (jaise "rolex-submariner")
  slug: {
    type: String,
    required: true, // Zaroori hai
    unique: true    // Do watches ka slug same nahi ho sakta
  },

  // Ghadi ka main naam (e.g. "Aurelion Chrono")
  name: {
    type: String,
    required: true
  },

  // Ghadi ka tagline/subtitle (e.g. "Classic Edition")
  subtitle: {
    type: String,
    required: true
  },

  // Watch ki poori detailed explanation
  description: {
    type: String,
    required: true
  },

  // Key highlights ka array/list (e.g. ["Steel", "Sunray Dial", "Automatic"])
  highlights: [
    { type: String }
  ],

  // Watch ke technical details ke liye nested object
  specs: {
    caseSize: { type: String },        // Size (e.g. "41mm")
    movement: { type: String },        // Machine type (e.g. "Automatic")
    waterResistance: { type: String }, // Water depth (e.g. "100m")
    material: { type: String },        // Body material (e.g. "Stainless Steel")
    strap: { type: String }            // Patte ka material (e.g. "Leather")
  },

  // Images ka data
  images: {
    hero: { type: String, required: true }, // Main display photo ka URL (zaroori hai)
    gallery: [{ type: String }]             // Baaki extra photos ke URLs ki list
  },

  // Frontend par card ki styling/colors manage karne ke liye
  cardColors: {
    primary: { type: String },   // Main color code
    secondary: { type: String }  // Accent color code
  },

  // Ghadi ko homepage/spotlight section me dikhana hai ya nahi
  featured: {
    type: Boolean,
    default: false // By default false rahega jab tak true set na karein
  }
}, {
  // Yeh automatically do fields banayega: 'createdAt' aur 'updatedAt'
  timestamps: true
});

// 3. Schema ko 'Watch' naam ke Model me convert karke export kiya
module.exports = mongoose.model('Watch', watchSchema);
