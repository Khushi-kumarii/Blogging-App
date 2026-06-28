import app from "./app.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";
import { db } from "./database/db.js"; // ✅ adjust path if needed

// ✅ Load environment variables from config/config.env
dotenv.config({ path: "./config/config.env" });

// ✅ Connect to MongoDB
db();

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// ✅ Start the server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
