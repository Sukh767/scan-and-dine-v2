import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiningSession',
      required: true,
      unique: true, // one payment per session
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      subtotal:      { type: Number, required: true },
      discount:      { type: Number, default: 0 },
      tax:           { type: Number, default: 0 },
      serviceCharge: { type: Number, default: 0 },
      grandTotal:    { type: Number, required: true },
    },

    method: {
      type: String,
      enum: ['online', 'cash', 'card', 'upi'],
      required: true,
    },

    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },

    // For online payments (Razorpay / Stripe etc.)
    gateway: {
      name:          String, // 'razorpay', 'stripe'
      orderId:       String, // gateway order id
      paymentId:     String, // gateway payment id
      signature:     String, // for verification
    },

    // For cash/card — restaurant staff confirms
    confirmedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    confirmedAt: Date,

    paidAt:     Date,
    refundedAt: Date,
    refundReason: String,
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ restaurantId: 1, createdAt: -1 });
paymentSchema.index({ customerId: 1 });
paymentSchema.index({ status: 1 });

export default mongoose.model('Payment', paymentSchema);
