/// server.js
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import bodyParser from "body-parser";

const app = express();

// Setup middlewares
app.use(cors());

// ✅ Raw body for Clerk webhook
app.post("/webhooks", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// ✅ JSON parsing for other routes
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working ✅"));

// Sentry error handling
Sentry.setupExpressErrorHandler(app);

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
  }
};

startServer();

export default app;
