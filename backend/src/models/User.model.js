import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ROLE_VALUES, ROLES } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    role: {
    type: String,
    enum: ROLE_VALUES,
    default: ROLES.USER,
},
    phone: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // never returned in queries by default
    },

    avatar: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // For email verification / password reset flows
    verificationToken: {
      type: String,
      select: false,
    },

    verificationTokenExpiresAt: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
      select: false,
    },

    resetPasswordExpiresAt: {
      type: Date,
    },

    refreshToken: {
      type: String,
      select: false,
      default: null,
    },

    // Track last login for analytics
    lastLoginAt: Date,
  },
  {
    timestamps: true, // adds createdAt + updatedAt
  },
);

// ─── Hash password before save ──────────────────────────────────────────────
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ─── Instance method: compare password ──────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// ─── Indexes ─────────────────────────────────────────────────────────────────
//userSchema.index({ email: 1 });
//userSchema.index({ role: 1 });
//userSchema.index({ restaurantId: 1 });

export default mongoose.model("User", userSchema);
