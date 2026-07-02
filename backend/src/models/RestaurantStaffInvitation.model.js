import mongoose from "mongoose";

import {
  RESTAURANT_STAFF_ROLE_VALUES,
  STAFF_INVITATION_STATUS,
  STAFF_INVITATION_STATUS_VALUES,
} from "../constants/index.js";

const restaurantStaffInvitationSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
      index: true,
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: RESTAURANT_STAFF_ROLE_VALUES,
      required: true,
    },

    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    status: {
      type: String,
      enum: STAFF_INVITATION_STATUS_VALUES,
      default: STAFF_INVITATION_STATUS.PENDING,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    rejectedAt: {
      type: Date,
      default: null,
    },

    cancelledAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

/*
|--------------------------------------------------------------------------
| Indexes
|--------------------------------------------------------------------------
*/

restaurantStaffInvitationSchema.index({
  restaurantId: 1,
  status: 1,
});

restaurantStaffInvitationSchema.index({
  email: 1,
  status: 1,
});

restaurantStaffInvitationSchema.index({
  expiresAt: 1,
});

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default mongoose.model(
  "RestaurantStaffInvitation",
  restaurantStaffInvitationSchema,
);