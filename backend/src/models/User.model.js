const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // never returned in queries by default
    },

    // ─── Role ──────────────────────────────────────────────────────────────
    // customer       → uses Customer Portal
    // restaurant     → uses Restaurant Admin Portal
    // super_admin    → uses Super Admin Portal
    role: {
      type: String,
      enum: ['customer', 'restaurant', 'super_admin'],
      default: 'customer',
    },

    // Set for restaurant owners — which restaurant they own
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // For email verification / password reset flows
    verificationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    // Track last login for analytics
    lastLoginAt: Date,
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  }
);

// ─── Hash password before save ──────────────────────────────────────────────
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance method: compare password ──────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ─── Indexes ─────────────────────────────────────────────────────────────────
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ restaurantId: 1 });

module.exports = mongoose.model('User', userSchema);
