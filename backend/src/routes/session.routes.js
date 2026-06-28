
import express from 'express';
import { protect, authorise } from '../middleware/authMiddleware.js';
import {
  scanQR,
  getSession,
  getBill,
  closeSession,
  getActiveSessions,
} from '../controllers/session.controller.js';

const router = express.Router();

// Customer scans QR
router.post('/scan', protect, authorise('customer'), scanQR);

// Customer views their session
router.get('/:sessionId',       protect, getSession);
router.get('/:sessionId/bill',  protect, getBill);
router.patch('/:sessionId/close', protect, closeSession);

// Restaurant owner views live sessions
router.get('/', protect, authorise('restaurant', 'super_admin'), getActiveSessions);

module.exports = router;
