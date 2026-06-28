const express = require('express');
const { protect, authorise } = require('../middleware/authMiddleware');
const router = express.Router();

// Stub — implement controllers as you build the offer feature
router.get('/', protect, (req, res) =>
  res.json({ success: true, data: [], message: 'offer routes — implement controller' })
);

module.exports = router;
