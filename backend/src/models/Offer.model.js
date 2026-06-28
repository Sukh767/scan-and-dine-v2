import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },

    title:       { type: String, required: true },
    description: String,
    code:        { type: String, uppercase: true, trim: true }, // promo code (optional)

    discountType: {
      type: String,
      enum: ['percentage', 'flat'],
      required: true,
    },

    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },

    // Minimum order value to apply offer
    minOrderValue: { type: Number, default: 0 },

    // Maximum discount cap (useful for percentage discounts)
    maxDiscount: { type: Number, default: null },

    // Restrict to specific categories or items (empty = entire bill)
    applicableCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    applicableItems:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],

    // Validity window
    validFrom:  { type: Date, required: true },
    validUntil: { type: Date, required: true },

    // Usage limits
    usageLimit:     { type: Number, default: null }, // null = unlimited
    usageCount:     { type: Number, default: 0 },
    perUserLimit:   { type: Number, default: 1 },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

offerSchema.index({ restaurantId: 1, isActive: 1 });
offerSchema.index({ code: 1 });

export default mongoose.model('Offer', offerSchema);
