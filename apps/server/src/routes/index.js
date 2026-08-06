import { Router } from "express";
import authRoutes from "./auth.routes.js";
import adminRestaurantRoutes from "./admin.restaurant.routes.js";
import restaurantProfileRoutes from "./restaurantProfile.routes.js";
import categoryRoutes from "./category.routes.js";
import menuRoutes from "./menu.routes.js";
import tableRoutes from "./table.routes.js";
import diningSessionRoutes from "./diningSession.routes.js";
import publicRestaurantRoutes from "./publicRestaurant.routes.js";
import publicScanRoutes from "./publicScan.routes.js";
import publicSessionRoutes from "./publicSession.routes.js";
import publicMenuRoutes from "./publicMenu.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Scan & Dine API is running 🚀",
    timestamp: new Date().toISOString(),
  });
});

router.use("/public/restaurants", publicRestaurantRoutes);

router.use("/auth", authRoutes);

router.use("/admin/restaurants", adminRestaurantRoutes);

router.use("/restaurants/me", restaurantProfileRoutes);

router.use("/categories", categoryRoutes);

router.use("/menu", menuRoutes);

router.use("/tables", tableRoutes);

router.use("/sessions", diningSessionRoutes);

router.use("/public/scan", publicScanRoutes);

router.use("/public/session", publicSessionRoutes);

router.use("/public/menu", publicMenuRoutes);

export default router;
