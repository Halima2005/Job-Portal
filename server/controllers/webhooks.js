import Svix from "svix"; // Default import for CommonJS module
import User from "../models/User.js";

// Create a Svix webhook instance
const whook = new Svix.Webhook(process.env.CLERK_WEBHOOK_SECRET);

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    // Verify Headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Getting Data from request body
    const { data, type } = req.body;

    // Switch cases for different Events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_address[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        res.json({});
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Webhooks Error" });
  }
};
