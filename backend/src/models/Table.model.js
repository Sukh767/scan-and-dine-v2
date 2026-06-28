const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tableSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    tableNumber: {
      type: String,
      required: true,
      trim: true,
    },

    label: {
      type: String,
      trim: true, // e.g. "Window Seat", "Rooftop T-4"
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    // ─── QR ────────────────────────────────────────────────────────────────
    qrToken: {
      type: String,
      unique: true,
      default: () => uuidv4(), // stable UUID — embedded in the printed QR
    },

    qrImageUrl: {
      type: String, // Cloudinary URL of the generated QR image
      default: null,
    },

    // ─── Status ────────────────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['available', 'reserved', 'occupied', 'inactive'],
      default: 'available',
    },

    // Active dining session for this table
    currentSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiningSession',
      default: null,
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// ─── Compound index: a restaurant can't have two tables with the same number ──
tableSchema.index({ restaurantId: 1, tableNumber: 1 }, { unique: true });
tableSchema.index({ restaurantId: 1, status: 1 });
tableSchema.index({ qrToken: 1 });

module.exports = mongoose.model('Table', tableSchema);
