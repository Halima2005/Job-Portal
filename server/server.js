/// server.js
import * as Sentry from "@sentry/node";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/db.js";
import "./config/instrument.js";
import { clerkWebhooks } from "./controllers/webhooks.js";
import bodyParser from "body-parser";
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from "./config/cloudinary.js";
import jobRoutes from './routes/jobRoutes.js'
import userRoutes from './routes/userRoutes.js'
import {clerkMiddleware} from '@clerk/express'


const app = express();

// Setup middlewares
app.use(cors());

// ✅ Raw body for Clerk webhook
app.post("/webhooks", bodyParser.raw({ type: "application/json" }), clerkWebhooks);

// ✅ JSON parsing for other routes
app.use(express.json());
app.use(clerkMiddleware())
// Routes
app.get("/", (req, res) => res.send("API Working ✅"));
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)
app.use('/api/users',userRoutes)
// Sentry error handling
Sentry.setupExpressErrorHandler(app);

// Start server PORT
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
  }
};
await connectCloudinary();
startServer();

export default app;
