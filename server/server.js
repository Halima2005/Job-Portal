import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import bodyParser from "body-parser";

const app = express();

// CORS
app.use(cors());



// ✅ Webhook route - needs raw body parsing for Clerk
app.post("/webhooks", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// ✅ Now parse JSON for all other routes
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("API Working ✅"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Sentry Error Handler
Sentry.setupExpressErrorHandler(app);

// Server start
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

startServer();
export default app;
