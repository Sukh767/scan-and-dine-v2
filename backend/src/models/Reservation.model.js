import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema(
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

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      default: null, // assigned when restaurant accepts
    },

    date: {
      type: Date,
      required: true,
    },

    timeSlot: {
      start: { type: String, required: true }, // "19:00"
      end:   { type: String, required: true }, // "21:00"
    },

    guestCount: {
      type: Number,
      required: true,
      min: 1,
    },

    specialRequests: String,

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },

    rejectionReason: String,
    cancelledBy:     { type: String, enum: ['customer', 'restaurant'] },
    cancelledAt:     Date,

    // When the customer actually arrives and gets seated
    checkedInAt: Date,

    reservationCode: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
      // Generates a quick 6-character code like "RSV8X2Q" automatically
      default: () => 'RSV' + Math.random().toString(36).substring(2, 6).toUpperCase(),
    },

    // Linked to the dining session created when they check in
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiningSession',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

reservationSchema.index({ restaurantId: 1, date: 1, status: 1 });
reservationSchema.index({ userId: 1, status: 1 });
reservationSchema.index({ tableId: 1, date: 1 });

export default mongoose.model('Reservation', reservationSchema);
