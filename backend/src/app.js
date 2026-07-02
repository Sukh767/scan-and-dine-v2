import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";

import { errorHandler, notFound } from "./middlewares/error.middleware.js";

import restaurantRoutes from "./routes/restaurant.routes.js";

const app = express();

/**
 * Security
 */
app.use(helmet());

/**
 * CORS
 */
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
  process.env.RESTAURANT_ADMIN_ORIGIN,
  process.env.SUPER_ADMIN_ORIGIN,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS policy: ${origin} is not allowed.`)
      );
    },
    credentials: true,
  })
);

/**
 * Rate Limiter
 */
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  })
);

/**
 * Parsers
 */
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * Logger
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * API Routes
 */
app.use("/api/v1", routes);
app.use("/api/v1/restaurants", restaurantRoutes);
/**
 * 404
 */
app.use(notFound);

/**
 * Global Error Handler
 */
app.use(errorHandler);

export default app;