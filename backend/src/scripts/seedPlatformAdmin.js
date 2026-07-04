import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";

import User from "../models/User.model.js";

import { ROLES } from "../constants/index.js";

dotenv.config();

const seedPlatformAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: process.env.PLATFORM_ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("✅ Platform Admin already exists.");
      process.exit(0);
    }

    await User.create({
      name: process.env.PLATFORM_ADMIN_NAME,
      email: process.env.PLATFORM_ADMIN_EMAIL,
      password: process.env.PLATFORM_ADMIN_PASSWORD,
      role: ROLES.PLATFORM_ADMIN,
      isVerified: true,
      isActive: true,
    });

    console.log("🎉 Platform Admin created successfully.");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedPlatformAdmin();
