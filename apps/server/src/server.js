import "dotenv/config";
import "express-async-errors";

import app from "./app.js";

import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`
        🚀 Scan & Dine API
        Environment : ${process.env.NODE_ENV}
        Port        : ${PORT}
        API         : http://localhost:${PORT}/api/v1
        Health      : http://localhost:${PORT}/api/v1/health
      `);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
