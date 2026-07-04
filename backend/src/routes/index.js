import { Router } from "express";
import authRoutes from "./auth.routes.js";
import adminRestaurantRoutes from "./admin.restaurant.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Scan & Dine API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

router.use("/auth", authRoutes);

router.use("/admin/restaurants", adminRestaurantRoutes);

export default router;
