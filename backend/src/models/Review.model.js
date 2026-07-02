import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    userId: {
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

    // Differentiates the expectations and experiences of different customer types
    visitType: {
      type: String,
      enum: ['reservation', 'walk_in'],
      default: 'walk_in',
    },

    isPublic: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ restaurantId: 1, isPublic: 1, createdAt: -1 });
reviewSchema.index({ userId: 1 });

export default mongoose.model('Review', reviewSchema);
