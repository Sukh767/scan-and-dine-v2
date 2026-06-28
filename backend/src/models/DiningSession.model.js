import mongoose from 'mongoose';

/**
 * DiningSession
 * ─────────────
 * Created the moment a customer scans a QR code.
 * All orders placed during a single visit are attached to this session.
 * One session = one bill = one payment.
 *
 * Lifecycle:
 *   active → (all orders done) → awaiting_payment → paid → closed
 *            or abandoned (no order placed, timeout)
 */
const diningSessionSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Optional: linked reservation that triggered this session
    reservationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reservation',
      default: null,
    },

    // All orders placed in this session (populated via Order.sessionId)
    // Not stored here — query Orders by sessionId instead for flexibility

    status: {
      type: String,
      enum: ['active', 'awaiting_payment', 'paid', 'closed', 'abandoned'],
      default: 'active',
    },

    // Running totals (updated each time a new order is placed)
    totals: {
      subtotal:      { type: Number, default: 0 },
      discount:      { type: Number, default: 0 }, // from offers
      tax:           { type: Number, default: 0 },
      serviceCharge: { type: Number, default: 0 },
      grandTotal:    { type: Number, default: 0 },
    },

    // The applied offer, if any
    appliedOfferId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Offer',
      default: null,
    },

    // Customer headcount (set when session starts or updated)
    guestCount: { type: Number, default: 1 },

    // Handles dine-in, takeaway, or a mix of both in one single bill
    sessionType: {
      type: String,
      enum: ['dine_in', 'takeaway', 'mixed'],
      default: 'dine_in',
    },

    // Financial state of the session (separated from physical table status)
    billStatus: {
      type: String,
      enum: ['open', 'payment_pending', 'paid', 'closed', 'refunded'],
      default: 'open',
    },

    // Special instructions for the whole table
    tableNote: String,

    // Timestamps for lifecycle tracking
    startedAt:  { type: Date, default: Date.now },
    closedAt:   { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

diningSessionSchema.index({ restaurantId: 1, status: 1 });
diningSessionSchema.index({ tableId: 1, status: 1 });
diningSessionSchema.index({ customerId: 1 });
diningSessionSchema.index({ restaurantId: 1, createdAt: -1 }); // for analytics

export default mongoose.model('DiningSession', diningSessionSchema);
