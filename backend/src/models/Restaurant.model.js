const mongoose = require('mongoose');

// ─── Operating Hours sub-schema ───────────────────────────────────────────────
const dayHoursSchema = new mongoose.Schema(
  {
    isOpen: { type: Boolean, default: true },
    open: { type: String, default: '09:00' },   // "HH:mm"
    close: { type: String, default: '22:00' },
  },
  { _id: false }
);

const operatingHoursSchema = new mongoose.Schema(
  {
    monday:    dayHoursSchema,
    tuesday:   dayHoursSchema,
    wednesday: dayHoursSchema,
    thursday:  dayHoursSchema,
    friday:    dayHoursSchema,
    saturday:  dayHoursSchema,
    sunday:    dayHoursSchema,
  },
  { _id: false }
);

// ─── Address sub-schema ───────────────────────────────────────────────────────
const addressSchema = new mongoose.Schema(
  {
    street:  String,
    city:    String,
    state:   String,
    country: String,
    pincode: String,
    // GeoJSON for location-based search
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
  },
  { _id: false }
);

// ─── Restaurant schema ────────────────────────────────────────────────────────
const restaurantSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: String,

    logo: String,
    coverImage: String,
    images: [String],

    cuisineTypes: [String], // e.g. ['Indian', 'Chinese', 'Italian']

    address: addressSchema,

    phone: String,
    email: String,
    website: String,

    operatingHours: {
      type: operatingHoursSchema,
      default: () => ({}),
    },

    // Subscription & SaaS tier
    subscription: {
      plan: {
        type: String,
        enum: ['free', 'basic', 'pro', 'enterprise'],
        default: 'free',
      },
      status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'trial'],
        default: 'trial',
      },
      trialEndsAt: Date,
      currentPeriodEnd: Date,
    },

    // Approval by super admin
    isApproved: { type: Boolean, default: false },
    isActive:   { type: Boolean, default: true },

    // Aggregate stats (denormalized for quick reads)
    stats: {
      totalOrders:   { type: Number, default: 0 },
      totalRevenue:  { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalReviews:  { type: Number, default: 0 },
    },

    settings: {
      acceptsReservations: { type: Boolean, default: true },
      acceptsOnlinePayment: { type: Boolean, default: true },
      autoAcceptOrders:     { type: Boolean, default: false },
      taxRate:              { type: Number, default: 0 }, // percentage
      serviceCharge:        { type: Number, default: 0 }, // percentage
      currency:             { type: String, default: 'INR' },
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
restaurantSchema.index({ ownerId: 1 });
restaurantSchema.index({ slug: 1 });
restaurantSchema.index({ isApproved: 1, isActive: 1 });
restaurantSchema.index({ 'address.coordinates': '2dsphere' }); // geo queries

// Auto-generate slug from name
restaurantSchema.pre('save', function (next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
