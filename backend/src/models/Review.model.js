const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiningSession',
      required: true,
      unique: true, // one review per dining session
    },

    // Overall + breakdown
    rating: {
      overall:  { type: Number, required: true, min: 1, max: 5 },
      food:     { type: Number, min: 1, max: 5 },
      service:  { type: Number, min: 1, max: 5 },
      ambiance: { type: Number, min: 1, max: 5 },
    },

    comment: { type: String, trim: true },

    images: [String],

    // Restaurant reply
    reply: {
      text:       String,
      repliedAt:  Date,
      repliedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },

    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ restaurantId: 1, isPublic: 1, createdAt: -1 });
reviewSchema.index({ customerId: 1 });

module.exports = mongoose.model('Review', reviewSchema);
