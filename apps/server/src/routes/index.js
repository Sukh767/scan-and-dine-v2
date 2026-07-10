import { Router } from "express";
import authRoutes from "./auth.routes.js";
import adminRestaurantRoutes from "./admin.restaurant.routes.js";
import restaurantProfileRoutes from "./restaurantProfile.routes.js";
import categoryRoutes from "./category.routes.js";
import menuRoutes from "./menu.routes.js";
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
router.use("/restaurants/me", restaurantProfileRoutes);

router.use("/categories", categoryRoutes);

router.use("/menu", menuRoutes);

export default router;
