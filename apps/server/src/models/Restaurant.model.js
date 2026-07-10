import mongoose from "mongoose";

import {
  RESTAURANT_OPERATIONAL_STATUS,
  RESTAURANT_OPERATIONAL_STATUS_VALUES,
  RESTAURANT_APPROVAL_STATUS,
  RESTAURANT_APPROVAL_STATUS_VALUES,
  RESTAURANT_PRICE_RANGE,
  RESTAURANT_FACILITIES_VALUES,
  SUBSCRIPTION_PLANS,
  SUBSCRIPTION_PLAN_VALUES,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_STATUS_VALUES,
  RESTAURANT_STAFF_ROLE_VALUES,
} from "../constants/index.js";

// ─── Operating Hours sub-schema ───────────────────────────────────────────────
const dayHoursSchema = new mongoose.Schema(
  {
    isOpen: { type: Boolean, default: true },
    open: { type: String, default: "09:00" }, // "HH:mm"
    close: { type: String, default: "22:00" },
  },
  { _id: false },
);

const operatingHoursSchema = new mongoose.Schema(
  {
    monday: dayHoursSchema,
    tuesday: dayHoursSchema,
    wednesday: dayHoursSchema,
    thursday: dayHoursSchema,
    friday: dayHoursSchema,
    saturday: dayHoursSchema,
    sunday: dayHoursSchema,
  },
  { _id: false },
);

// ─── Address sub-schema ───────────────────────────────────────────────────────
const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
    // GeoJSON for location-based search
    coordinates: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], default: [0, 0] }, // [lng, lat]
    },
  },
  { _id: false },
);

// ─── Restaurant schema ────────────────────────────────────────────────────────
const restaurantSchema = new mongoose.Schema(
  {
    // Core Identity
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: String,

    // Media
    logo: {
      url: String,
      publicId: String,
    },

    coverImage: {
      url: String,
      publicId: String,
    },

    gallery: [
      {
        url: String,
        publicId: String,
        caption: String,
      },
    ],

    staff: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        role: {
          type: String,
          enum: RESTAURANT_STAFF_ROLE_VALUES,
          required: true,
        },

        joinedAt: Date,

        isActive: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // Details & Meta
    cuisineTypes: [String],

    priceRange: {
      type: String,
      enum: Object.values(RESTAURANT_PRICE_RANGE),
      default: RESTAURANT_PRICE_RANGE.MEDIUM,
    },

    facilities: [
      {
        type: String,
        enum: RESTAURANT_FACILITIES_VALUES,
      },
    ],
    chefHighlights: [
      {
        name: String,
        experience: String,
        specialty: String,
      },
    ],

    // Contact & Location
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    website: String,
    socialMedia: {
      instagram: String,
      facebook: String,
      x: String,
      youtube: String,
    },

    address: addressSchema,
    operatingHours: {
      type: operatingHoursSchema,
      default: () => ({}),
    },

    // Statuses
    operationalStatus: {
      type: String,
      enum: RESTAURANT_OPERATIONAL_STATUS_VALUES,
      default: RESTAURANT_OPERATIONAL_STATUS.CLOSED,
    },

    approvalStatus: {
      type: String,
      enum: RESTAURANT_APPROVAL_STATUS_VALUES,
      default: RESTAURANT_APPROVAL_STATUS.PENDING,
    },

    isActive: { type: Boolean, default: true }, // Global soft-delete/suspend

    approval: {
      approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      approvedAt: Date,

      rejectedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      rejectedAt: Date,

      rejectionReason: String,
    },

    // Subscription & SaaS tier
    subscription: {
      plan: {
        type: String,
        enum: SUBSCRIPTION_PLAN_VALUES,
        default: SUBSCRIPTION_PLANS.FREE,
      },

      status: {
        type: String,
        enum: SUBSCRIPTION_STATUS_VALUES,
        default: SUBSCRIPTION_STATUS.TRIAL,
      },

      trialEndsAt: Date,

      currentPeriodEnd: Date,

      startedAt: Date,

      renewedAt: Date,
    },

    // Aggregate stats (denormalized for quick reads)
    stats: {
      totalOrders: { type: Number, default: 0 },
      totalRevenue: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalReviews: { type: Number, default: 0 },
    },

    // Payment & Ordering Rules
    settings: {
      acceptsReservations: { type: Boolean, default: true },
      acceptsOnlinePayment: { type: Boolean, default: true },
      autoAcceptOrders: { type: Boolean, default: false },
      taxRate: { type: Number, default: 0 }, // percentage
      serviceCharge: { type: Number, default: 0 }, // percentage
      currency: { type: String, default: "INR" },
    },
  },
  {
    timestamps: true,
  },
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
restaurantSchema.index({ ownerId: 1 });
restaurantSchema.index({ slug: 1 });
restaurantSchema.index({
  approvalStatus: 1,
  isActive: 1,
});
restaurantSchema.index({ operationalStatus: 1 }); // Useful for filtering open restaurants
restaurantSchema.index({ "address.coordinates": "2dsphere" });

// Auto-generate slug from name
restaurantSchema.pre("save", function (next) {
  if (this.isModified("name") && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

export default mongoose.model("Restaurant", restaurantSchema);
