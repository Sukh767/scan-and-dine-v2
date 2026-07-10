import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { TABLE_STATUS_VALUES } from "../constants/index.js";

const tableSchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },

    tableNumber: {
      type: String,
      required: true,
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      trim: true,
    },

    label: {
      type: String,
      trim: true, // e.g. "Window Seat", "Rooftop T-4"
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    // ─── Location & Mapping (Future-Proofing) ──────────────────────────────
    floor: {
      type: String,
      trim: true,
      // e.g., 'Ground Floor', 'First Floor', 'Rooftop'
    },

    section: {
      type: String,
      trim: true,
      // e.g., 'Window', 'VIP', 'Outdoor', 'Bar Area'
    },

    // ─── QR ────────────────────────────────────────────────────────────────
    qrToken: {
      type: String,
      unique: true,
      default: () => uuidv4(), // stable UUID — embedded in the printed QR
    },

    qrImage: {
      url: {
        type: String,
      },

      publicId: {
        type: String,
      },
    },

    // ─── Status ────────────────────────────────────────────────────────────
    status: {
      type: String,

      enum: TABLE_STATUS_VALUES,

      default: TABLE_STATUS_VALUES[0], // default to the first status in the enum
    },

    // Active dining session for this table
    currentSessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DiningSession",
      default: null,
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

// ─── Compound index: a restaurant can't have two tables with the same number ──
tableSchema.index({ restaurantId: 1, tableNumber: 1 }, { unique: true });
tableSchema.index({ restaurantId: 1, status: 1 });
tableSchema.index({ qrToken: 1 });

tableSchema.index({
  restaurantId: 1,
  floor: 1,
});

tableSchema.index({
  restaurantId: 1,
  section: 1,
});

export default mongoose.model("Table", tableSchema);
