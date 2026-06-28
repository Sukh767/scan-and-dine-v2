import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Allows favoriting a whole restaurant OR a specific dish
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      default: null,
    },
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      default: null,
    },
  },
  {
    timestamps: true, // Automatically handles 'createdAt'
  }
);

// Indexes for lightning-fast homepage loading ("Continue Dining", "Favorite Food")
favoriteSchema.index({ customerId: 1, restaurantId: 1 });
favoriteSchema.index({ customerId: 1, menuItemId: 1 });
// Index for platform analytics (e.g., finding trending items)
favoriteSchema.index({ menuItemId: 1, createdAt: -1 });

export default mongoose.model('Favorite', favoriteSchema);