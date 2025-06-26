import * as Sentry from "@sentry/node";
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import './config/instrument.js';
import { clerkWebhooks } from "./controllers/webhooks.js";

// Initialize Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => res.send("API Working ✅"));
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks);

// Sentry Error Handler (must be after routes)
Sentry.setupExpressErrorHandler(app);

// Port
const PORT = process.env.PORT || 5000;

// Start Server (after routes and middlewares)
const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();

export default app;
