const express = require('express');

const router = express.Router();
const { getProfile } = require('../controllers/profile');
// const { protect } = require('../middleware/protect');

router.get('/', getProfile);

module.exports = router;
