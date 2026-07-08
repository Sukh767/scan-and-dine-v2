import express from 'express';
import { protect, authorise } from '../middleware/authMiddleware.js';

const router = express.Router();

// Stub — implement controllers as you build the menu feature
router.get('/', protect, (req, res) =>
  res.json({ success: true, data: [], message: 'menu routes — implement controller' })
);

export default router;
