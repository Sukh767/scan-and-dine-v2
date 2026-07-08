import express from 'express';
import { protect, authorise } from '../middleware/authMiddleware.js';

const router = express.Router();
// Stub — implement controllers as you build the offer feature
router.get('/', protect, (req, res) =>
  res.json({ success: true, data: [], message: 'offer routes — implement controller' })
);

export default router;
