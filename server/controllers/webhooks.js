// controllers/webhooks.js
import Svix from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("🔐 Received Clerk webhook");
    console.log("🟡 Webhook endpoint hit");
    console.log("Headers:", req.headers);
    console.log("Raw Body Buffer:", req.body);


    const payload = req.body; // raw Buffer
    const bodyString = payload.toString("utf8");

    const whook = new Svix.Webhook(process.env.CLERK_WEBHOOK_SECRET);
    whook.verify(bodyString, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = JSON.parse(bodyString);
    console.log("📦 Webhook type:", type);

    switch (type) {
      case "user.created":
        console.log("👤 Creating user...");
        try {
          const user = await User.create({
            _id: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
            resume: "",
          });
          console.log("✅ User saved:", user);
        } catch (err) {
          console.error("❌ Failed to save user:", err.message);
        }
        break;

      case "user.updated":
        console.log("✏️ Updating user...");
        try {
          await User.findByIdAndUpdate(data.id, {
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            image: data.image_url,
          });
          console.log("✅ User updated");
        } catch (err) {
          console.error("❌ Failed to update user:", err.message);
        }
        break;

      case "user.deleted":
        console.log("🗑 Deleting user...");
        try {
          await User.findByIdAndDelete(data.id);
          console.log("✅ User deleted");
        } catch (err) {
          console.error("❌ Failed to delete user:", err.message);
        }
        break;

      default:
        console.log("⚠️ Unknown event type:", type);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({ success: false, message: "Webhook error" });
  }
};
