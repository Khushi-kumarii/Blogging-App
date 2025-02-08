import{asyncError} from '../middlewares/asyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { User } from '../models/userSchema.js';
import {sendToken} from '../utils/jwtToken.js';
import cloudinary from 'cloudinary';

export const register =asyncError(async (req, res, next)=>{
  if(!req.files || Object.keys(req.files).length === 0){
    return next (new ErrorHandler("User avatar Required", 400));
   }
   const { avatar }=req.files;
   const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

   if(!allowedFormats.includes(avatar.mimetype)){
    return next (
        new ErrorHandler(
            "Please provide avatar format in png, jpg or webp.",
            400
        )
    );
   }

    const {name, email, password, phone, role, education}= req.body;
    if(!name || !email || !password || !phone || !role || !education || !avatar){
          return next(new ErrorHandler("Please fill all details", 400));
    }
    let user=await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already exist",400))
    }

  // 5️⃣ Upload avatar to Cloudinary ✅
  const cloudinaryResponse = await cloudinary.uploader.upload(avatar.tempFilePath, {
    folder: "avatars", // ✅ Organize uploads inside 'avatars' folder
    use_filename: true,
    resource_type: "image",
    transformation: [{ width: 500, height: 500, crop: "fill" }],
  }).catch(err => {
    console.error("🚨 Cloudinary Upload Error:", err);
    return null; // Prevents breaking the code
  });

  if (!cloudinaryResponse || !cloudinaryResponse.secure_url) {
    return next(new ErrorHandler("Cloudinary upload failed. Please try again.", 500));
  }
  
  user= await User.create({
        name, 
        email, 
        password, 
        phone, 
        role, 
        education,
        avatar:{
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });
    sendToken(user, 201, "User registered successfully", res);
});

export const login = asyncError(async(req, res, next)=>{
    const {email, password, role}= req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("Please fill all details in form!", 400));
    }
    const user= await User.findOne({email}).select("+password");
    if(!user){
        return next (new ErrorHandler("Invalid email or password", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password", 400));
    }
    if(user.role !== role){
        return next(
            new ErrorHandler(`User with provided role (${role}) not found`,400)
        );
    }
    sendToken(user, 200, "User logged in successfully", res);

});

export const logout=asyncError((req, res, next)=>{
    res
    .status(200)
    .cookie("token", "",{
        expires:new Date(Date.now()),
        httpOnly:true,
    })
    .json({
        success:true,
        message:"User Logged Out!"
    });
});

export const myProfile= asyncError((req,res,next)=>{
      const user = req.user;
      res.status(200).json({
        success:true,
        user,
      });
});

export const getAllAuthors= asyncError( async(req,res,next)=>{
      const authors= await User.find({role:"Author"});
      res.status(200).json({
        success:true,
        authors,
      })
})