import Svix from "svix"; // Default import for CommonJS module
import User from "../models/User.js";


export const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔐 Received Clerk webhook");

    const payload = req.body; // raw Buffer
    const bodyString = payload.toString("utf8");

    const whook = new Svix.Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(bodyString, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(bodyString);
    console.log("📦 Webhook type:", type);

    switch (type) {
      case "user.created":
        console.log("👤 Creating user");
        await User.create({
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        });
        break;
      case "user.updated":
        console.log("✏️ Updating user");
        await User.findByIdAndUpdate(data.id, {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        });
        break;
      case "user.deleted":
        console.log("🗑 Deleting user");
        await User.findByIdAndDelete(data.id);
        break;
      default:
        console.log("⚠️ Unknown event type");
    }
    

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
};












// API Controller Function to Manage Clerk User with database
