const mongoose = require('mongoose');

// Each item line in an order
const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true,
    },

    // Snapshot at time of order (so menu changes don't affect history)
    name:  { type: String, required: true },
    price: { type: Number, required: true },

    // If a variant was chosen
    variantId:   { type: mongoose.Schema.Types.ObjectId, default: null },
    variantName: String,

    quantity: { type: Number, required: true, min: 1 },

    // per-item subtotal (price * quantity, already including variant price)
    subtotal: { type: Number, required: true },

    customNote: String, // "No onions"

    // Kitchen tracking per line item
    status: {
      type: String,
      enum: ['pending', 'preparing', 'ready', 'served'],
      default: 'pending',
    },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
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
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    tableId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table',
      required: true,
    },

    // Sequential number within the session: Order #1, #2, #3 …
    orderNumber: { type: Number, required: true },

    items: [orderItemSchema],

    // Order-level totals
    subtotal: { type: Number, required: true },

    // Kitchen / fulfillment status
    status: {
      type: String,
      enum: ['pending', 'accepted', 'preparing', 'ready', 'served', 'cancelled'],
      default: 'pending',
    },

    // Whether restaurant accepted/rejected
    restaurantNote: String, // e.g., "Out of chicken today"

    acceptedAt:  Date,
    preparedAt:  Date,
    servedAt:    Date,
    cancelledAt: Date,
  },
  {
    timestamps: true,
  }
);

orderSchema.index({ sessionId: 1, orderNumber: 1 });
orderSchema.index({ restaurantId: 1, status: 1 });
orderSchema.index({ restaurantId: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
