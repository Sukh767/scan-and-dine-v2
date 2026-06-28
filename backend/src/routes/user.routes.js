import express from "express";

import { protect,authorise } from "../middleware/authMiddleware.js";
// const { protect, authorise } = require('../middleware/authMiddleware');
const router = express.Router();

// Stub — implement controllers as you build each feature
router.get('/', protect, (req, res) => res.json({ success: true, data: [], message: 'user routes — implement controller' }));

export default router;


