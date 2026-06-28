const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const Restaurant = require('../models/Restaurant.model');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });

const generateRefreshToken = (id) =>
  jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });

const userPayload = (user) => ({
  _id:          user._id,
  name:         user.name,
  email:        user.email,
  role:         user.role,
  avatar:       user.avatar,
  restaurantId: user.restaurantId,
});

// ─── @POST /api/auth/register ─────────────────────────────────────────────────
const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'name, email, and password are required' });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ success: false, message: 'Email already registered' });
  }

  const user = await User.create({ name, email, password, phone, role: 'customer' });

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: userPayload(user),
      token:        generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    },
  });
};

// ─── @POST /api/auth/login ────────────────────────────────────────────────────
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'email and password are required' });
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  }

  if (!user.isActive) {
    return res.status(403).json({ success: false, message: 'Account is deactivated' });
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      user: userPayload(user),
      token:        generateToken(user._id),
      refreshToken: generateRefreshToken(user._id),
    },
  });
};

// ─── @POST /api/auth/refresh ──────────────────────────────────────────────────
const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ success: false, message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid refresh token' });
    }

    res.json({
      success: true,
      data: {
        token:        generateToken(user._id),
        refreshToken: generateRefreshToken(user._id),
      },
    });
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }
};

// ─── @GET /api/auth/me ────────────────────────────────────────────────────────
const getMe = async (req, res) => {
  res.json({ success: true, data: { user: userPayload(req.user) } });
};

module.exports = { register, login, refresh, getMe };
