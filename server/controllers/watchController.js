// 1. Database operations ke liye 'Watch' model import kiya
const Watch = require('../models/Watch');

// @desc    Saari watches fetch karne ka controller function
// @route   GET /api/watches
const getWatches = async (req, res) => {
  try {
    // 2. Database se bina kisi filter ke saari watches ka array nikala
    const watches = await Watch.find();

    // 3. Frontend ko saari watches ka data JSON format me bhej diya
    res.json(watches);
  } catch (error) {
    // 4. Server ya database fail hone par 500 error code ke saath message bheja
    res.status(500).json({ message: error.message });
  }
};

// @desc    Slug ke zariye single watch dhundne ka controller function
// @route   GET /api/watches/:slug
const getWatchBySlug = async (req, res) => {
  try {
    // 5. URL parameter (:slug) ke value se database me matching watch khoji (e.g. req.params.slug = "aurelion-chrono")
    const watch = await Watch.findOne({ slug: req.params.slug });

    // 6. Agar matching slug database me nahi mila toh 404 (Not Found) return kiya
    if (!watch) {
      return res.status(404).json({ message: 'Watch not found' });
    }

    // 7. Agar mil gayi toh single watch ka complete data JSON me bhej diya
    res.json(watch);
  } catch (error) {
    // 8. Server/Database error par 500 status return kiya
    res.status(500).json({ message: error.message });
  }
};

// 9. Dono functions ko export kiya taaki routes/watches.js me attach ho sakein
module.exports = { getWatches, getWatchBySlug };
