const Table = require('../models/Table.model');
const DiningSession = require('../models/DiningSession.model');
const Order = require('../models/Order.model');

// ─── @POST /api/sessions/scan ─────────────────────────────────────────────────
// Called when a customer scans a QR code.
// Creates a new session OR returns the existing active session for that table.
const scanQR = async (req, res) => {
  const { qrToken } = req.body;
  const customerId = req.user._id;

  if (!qrToken) {
    return res.status(400).json({ success: false, message: 'qrToken is required' });
  }

  const table = await Table.findOne({ qrToken, isActive: true });
  if (!table) {
    return res.status(404).json({ success: false, message: 'Invalid or inactive QR code' });
  }

  if (table.status === 'inactive') {
    return res.status(400).json({ success: false, message: 'This table is currently inactive' });
  }

  // If table is already occupied, return the active session for this customer
  if (table.status === 'occupied' && table.currentSessionId) {
    const existing = await DiningSession.findById(table.currentSessionId);
    if (existing && existing.customerId.toString() === customerId.toString()) {
      return res.json({ success: true, data: { session: existing, table } });
    }
    // Occupied by someone else
    return res.status(409).json({ success: false, message: 'Table is occupied by another customer' });
  }

  // Create new dining session
  const session = await DiningSession.create({
    restaurantId: table.restaurantId,
    tableId:      table._id,
    customerId,
    status:       'active',
  });

  // Mark table as occupied
  table.status           = 'occupied';
  table.currentSessionId = session._id;
  await table.save();

  res.status(201).json({ success: true, data: { session, table } });
};

// ─── @GET /api/sessions/:sessionId ───────────────────────────────────────────
const getSession = async (req, res) => {
  const session = await DiningSession.findById(req.params.sessionId)
    .populate('restaurantId', 'name logo settings')
    .populate('tableId', 'tableNumber label');

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  // Include all orders for this session
  const orders = await Order.find({ sessionId: session._id })
    .populate('items.menuItemId', 'name images');

  res.json({ success: true, data: { session, orders } });
};

// ─── @GET /api/sessions/:sessionId/bill ──────────────────────────────────────
// Live bill calculation
const getBill = async (req, res) => {
  const session = await DiningSession.findById(req.params.sessionId)
    .populate('restaurantId', 'settings')
    .populate('appliedOfferId');

  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  const orders = await Order.find({
    sessionId: session._id,
    status: { $nin: ['cancelled'] },
  });

  const subtotal = orders.reduce((sum, o) => sum + o.subtotal, 0);
  const { taxRate = 0, serviceCharge = 0 } = session.restaurantId.settings || {};

  const tax    = +(subtotal * (taxRate / 100)).toFixed(2);
  const svc    = +(subtotal * (serviceCharge / 100)).toFixed(2);
  const grand  = +(subtotal + tax + svc - session.totals.discount).toFixed(2);

  res.json({
    success: true,
    data: {
      subtotal,
      discount:      session.totals.discount,
      tax,
      serviceCharge: svc,
      grandTotal:    grand,
      orders:        orders.length,
    },
  });
};

// ─── @PATCH /api/sessions/:sessionId/close ───────────────────────────────────
const closeSession = async (req, res) => {
  const session = await DiningSession.findById(req.params.sessionId);
  if (!session) {
    return res.status(404).json({ success: false, message: 'Session not found' });
  }

  session.status   = 'closed';
  session.closedAt = new Date();
  await session.save();

  // Free the table
  await Table.findByIdAndUpdate(session.tableId, {
    status:           'available',
    currentSessionId: null,
  });

  res.json({ success: true, message: 'Session closed', data: { session } });
};

// ─── @GET /api/sessions (restaurant view — active sessions) ──────────────────
const getActiveSessions = async (req, res) => {
  const restaurantId = req.user.restaurantId;

  const sessions = await DiningSession.find({ restaurantId, status: 'active' })
    .populate('tableId', 'tableNumber label')
    .populate('customerId', 'name phone')
    .sort({ startedAt: 1 });

  res.json({ success: true, data: { sessions } });
};

module.exports = { scanQR, getSession, getBill, closeSession, getActiveSessions };
