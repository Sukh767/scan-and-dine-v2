const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

// ─── Verify JWT ───────────────────────────────────────────────────────────────
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorised — no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user || !req.user.isActive) {
      return res.status(401).json({ success: false, message: 'Account not found or deactivated' });
    }

    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Not authorised — invalid token' });
  }
};

// ─── Role guard factory ───────────────────────────────────────────────────────
// Usage: authorise('super_admin') or authorise('restaurant', 'super_admin')
const authorise = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role '${req.user.role}' is not permitted to access this resource`,
    });
  }
  next();
};

// ─── Restaurant ownership guard ───────────────────────────────────────────────
// Ensures a restaurant-role user can only touch their own restaurant
const ownRestaurant = (req, res, next) => {
  const restaurantId =
    req.params.restaurantId || req.body.restaurantId || req.query.restaurantId;

  if (
    req.user.role === 'super_admin' || // super admin bypasses
    req.user.restaurantId?.toString() === restaurantId
  ) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied — you do not own this restaurant',
  });
};

module.exports = { protect, authorise, ownRestaurant };
