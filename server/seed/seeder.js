const dotenv = require('dotenv');
const connectDB = require('../config/db');
const Watch = require('../models/Watch');

dotenv.config();
connectDB();

const watches = [
  {
    slug: 'meridian',
    name: 'Meridian',
    subtitle: 'AUTOMATIC',
    description: 'A quiet classic for every hour — steel case, silver sunburst dial, slim baton hands.',
    highlights: ['Steel', 'Sunray Dial', 'Automatic'],
    specs: {
      caseSize: '40mm',
      movement: 'Automatic',
      waterResistance: '100m',
      material: 'Stainless Steel',
      strap: 'Steel Bracelet'
    },
    images: {
      hero: '/images/product-meridian.jpeg',
      gallery: []
    },
    cardColors: {
      primary: '#EFE6D7',
      secondary: '#B89155'
    },
    featured: false
  },
  {
    slug: 'solstice',
    name: 'Solstice',
    subtitle: 'SELF-WINDING',
    description: 'Warmth carried through the evening — rose gold case, champagne sunburst dial, leather strap.',
    highlights: ['Rose Gold', 'Leather', 'Self-Winding'],
    specs: {
      caseSize: '38mm',
      movement: 'Self-Winding',
      waterResistance: '50m',
      material: 'Rose Gold',
      strap: 'Brown Leather'
    },
    images: {
      hero: '/images/product-solstice.jpeg',
      gallery: []
    },
    cardColors: {
      primary: '#B36A32',
      secondary: '#B89155'
    },
    featured: false
  },
  {
    slug: 'obscura',
    name: 'Obscura',
    subtitle: 'AUTOMATIC · 300M',
    description: 'Precision, sharpened in black — black DLC steel case, diver bezel, luminous markers.',
    highlights: ['DLC Steel', '300m', 'Automatic'],
    specs: {
      caseSize: '42mm',
      movement: 'Automatic',
      waterResistance: '300m',
      material: 'Black DLC Steel',
      strap: 'Black Leather'
    },
    images: {
      hero: '/images/product-obscura.jpeg',
      gallery: []
    },
    cardColors: {
      primary: '#050505',
      secondary: '#B89155'
    },
    featured: true
  }
];

const importData = async () => {
  try {
    await Watch.deleteMany();
    await Watch.insertMany(watches);
    console.log('Watches Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
