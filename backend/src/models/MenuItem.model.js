const mongoose = require('mongoose');

// Variant/add-on sub-schema (e.g., size options, extra toppings)
const variantSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true }, // "Large", "Extra Cheese"
    price: { type: Number, required: true },
  },
  { _id: true }
);

const menuItemSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    name: {
      type: String,
      required: [true, 'Item name is required'],
      trim: true,
    },

    description: String,

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },

    images: [String],

    // Dietary tags
    isVeg:      { type: Boolean, default: false },
    isVegan:    { type: Boolean, default: false },
    isGlutenFree: { type: Boolean, default: false },
    spiceLevel: {
      type: String,
      enum: ['none', 'mild', 'medium', 'hot', 'extra_hot'],
      default: 'none',
    },

    // Optional variants (if empty, price above is the only price)
    variants: [variantSchema],

    // Customisation note placeholder — e.g., "No onions"
    allowCustomNote: { type: Boolean, default: true },

    preparationTime: { type: Number, default: 15 }, // minutes

    sortOrder: { type: Number, default: 0 },

    isFeatured:    { type: Boolean, default: false },
    isAvailable:   { type: Boolean, default: true },
    isActive:      { type: Boolean, default: true },

    // Aggregate rating (denormalized)
    rating: {
      average: { type: Number, default: 0 },
      count:   { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

menuItemSchema.index({ restaurantId: 1, categoryId: 1, isActive: 1, sortOrder: 1 });
menuItemSchema.index({ restaurantId: 1, isFeatured: 1 });

module.exports = mongoose.model('MenuItem', menuItemSchema);
