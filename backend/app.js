import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import{db} from './database/db.js';
import { errormiddleware } from "./middlewares/error.js"; 
import userRoutes from "./routes/userRoutes.js";
import fileUpload from "express-fileupload";
import blogRoutes from "./routes/blogRoutes.js";

const app=express();
dotenv.config({path: "./config/config.env"});
console.log("Frontend URL:", process.env.FRONTEND_URL);  

app.use(cors({
   origin:[process.env.FRONTEND_URL],
   methods:["GET", "PUT", "DELETE", "POST"],
   credentials:true,
   allowedHeaders: ["Content-Type", "Authorization"], 
})
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(
   fileUpload({
     useTempFiles: true, // ✅ Ensures files are saved before Cloudinary upload
     tempFileDir: "/tmp/", // ✅ Stores temp files before upload
     limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
   })
 );
 

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);


db();

app.use(errormiddleware);
 
export default app;