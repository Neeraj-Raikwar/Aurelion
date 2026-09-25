// 1. Express framework ko import kiya
const express = require('express');

// 2. Express ka Router instance create kiya
const router = express.Router();

// 3. Controller se do functions import kiye (saari watches aur single watch laane ke liye)
const { getWatches, getWatchBySlug } = require('../controllers/watchController');

// 4. GET route ('/api/watches') - Saari watches ki list lene ke liye
router.get('/', getWatches);

// 5. GET route ('/api/watches/:slug') - Dynamic parameter ':slug' ke basis par specific watch fetch karne ke liye (jaise /api/watches/rolex-chrono)
router.get('/:slug', getWatchBySlug);

// 6. Router ko export kiya taaki server.js me connect ho sake
module.exports = router;
