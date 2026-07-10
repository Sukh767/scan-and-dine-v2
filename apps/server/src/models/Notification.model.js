import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    
    title: { type: String, required: true },
    message: { type: String, required: true },
    
    type: {
      type: String,
      enum: ['Order Accepted', 'Table Reserved', 'Payment Success', 'Offer Available', 'System'],
      required: true,
    },
    
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Automatically provides createdAt
  }
);

// Index to quickly fetch a user's unread notifications
notificationSchema.index({ userId: 1, read: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);