import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },

    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },

    description: String,

    image: {
      url: String,
      publicId: String,
    },

    // UI enhancement for mobile/web menus
    icon: {
      type: String, // Can store an Emoji "🍔" or an icon class name
      trim: true,
    },

    sortOrder: {
      type: Number,
      default: 0, // lower = shown first
    },

    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

categorySchema.index({ restaurantId: 1, isActive: 1, sortOrder: 1 });
categorySchema.index(
  {
    restaurantId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

export default mongoose.model("Category", categorySchema);
