import express from 'express';

// When you are ready to use the middleware, uncomment this. 
// Remember to include the .js extension!
import { protect, authorise } from '../middleware/authMiddleware.js';

const router = express.Router();

// Stub — implement controllers as you build each feature
// (I temporarily removed 'protect' from the arguments so your stub doesn't crash before the middleware is built)
router.get('/', protect, authorise, (req, res) => res.json({ success: true, data: [], message: 'user routes — implement controller' }));

export default router;