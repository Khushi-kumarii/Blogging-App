import express from "express";
import { asyncError } from "../middlewares/asyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Blog } from "../models/blogSchema.js";
import cloudinary from "cloudinary";

export const blogPost = asyncError(async (req, res, next) => {

  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Blog Main Image is mandatory", 400));
  }

  const { mainImage, paraOneImage, paraTwoImage } = req.files;

  if (!mainImage) {
    return next(new ErrorHandler("Main Image is mandatory!", 400));
  }

  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (
    !allowedFormats.includes(mainImage.mimetype) ||
    (paraOneImage && !allowedFormats.includes(paraOneImage.mimetype)) ||
    (paraTwoImage && !allowedFormats.includes(paraTwoImage.mimetype))
  ) {
    return next(
      new ErrorHandler("Only JPG, PNG, and WEBP formats are allowed!", 400)
    );
  }

  const {
    title,
    intro,
    paraOneDesc,
    paraOneTitle,
    paraTwoDesc,
    paraTwoTitle,
    category,
    published,
  } = req.body;

  const createdBy = req.user._id || null;
  const authorName = req.user.name || "Anonymous";
  const authorAvatar = req.user.avatar?.url || "default-avatar-url";

  if (!title || !category || !intro) {
    return next(
      new ErrorHandler("Title, Intro, and Category are required fields", 400)
    );
  }

  if (!req.user) {
    return next(new ErrorHandler("User authentication failed!", 401));
}
  // Handle Cloudinary uploads
   const uploadPromises = [
        cloudinary.uploader.upload(mainImage.tempFilePath).catch(err => {
            console.error("🚨 Cloudinary Upload Error (Main Image):", err);
            return null;
        }),
        paraOneImage
            ? cloudinary.uploader.upload(paraOneImage.tempFilePath).catch(err => {
                console.error("🚨 Cloudinary Upload Error (ParaOne Image):", err);
                return null;
            })
            : Promise.resolve(null),
        paraTwoImage
            ? cloudinary.uploader.upload(paraTwoImage.tempFilePath).catch(err => {
                console.error("🚨 Cloudinary Upload Error (ParaTwo Image):", err);
                return null;
            })
            : Promise.resolve(null),
    ];

  const [mainImageRes, paraOneImageRes, paraTwoImageRes] =
    await Promise.all(uploadPromises);

  if (
    !mainImageRes ||
    (mainImageRes.error ||
      (paraOneImage && (!paraOneImageRes || paraOneImageRes.error)) ||
      (paraTwoImage && (!paraTwoImageRes || paraTwoImageRes.error)))
  ) {
    return next(
      new ErrorHandler("Error while uploading one or more images!", 500)
    );
  }

  // Build blog data
  const blogData = {
    title,
    intro,
    paraOneDesc,
    paraOneTitle,
    paraTwoDesc,
    paraTwoTitle,
    category,
    createdBy,
    authorName,
    authorAvatar,
    published,
    mainImage: {
      public_id: mainImageRes.public_id,
      url: mainImageRes.secure_url,
    },
  };

  if (paraOneImageRes) {
    blogData.paraOneImage = {
      public_id: paraOneImageRes.public_id,
      url: paraOneImageRes.secure_url,
    };
  }

  if (paraTwoImageRes) {
    blogData.paraTwoImage = {
      public_id: paraTwoImageRes.public_id,
      url: paraTwoImageRes.secure_url,
    };
  }

  try {
    const blog = await Blog.create(blogData);
    res.status(200).json({
        success: true,
        message: "Blog created successfully",
        blog,
    });
} catch (error) {
    return next(new ErrorHandler(error.message, 400));
}
});


export const deleteBlog=asyncError(async(req,res,next)=>{
  const { id }=req.params;
  const blog=await Blog.findById(id);
  if(!blog){
    return next (new ErrorHandler("Blog not found!",404));
  }
  await blog.deleteOne();
  res.status(200).json({
    success:true,
    message:"Blog Deleted",
  });
});

export const getAllBlogs =asyncError(async(req,res,next)=>{
  const allBlogs = await Blog.find({ published: true }); 
  res.status(200).json({
    success:true,
    allBlogs,
  });
});

export const getSingleBlog=asyncError(async(req,res,next)=>{
  const {id}=req.params;
  const blog = await Blog.findById(id);
  if(!blog){
    return next(new ErrorHandler("Blog not found",404));
  }
  res.status(200).json({
    success:true,
    blog,
  });
});

export const getMyBlogs= asyncError(async(req,res,next)=>{
  const createdBy= req.user._id;
  const blogs=await Blog.find({ createdBy });
  res.status(200).json({
    success:true,
    blogs,
  });
});

export const updateBlog = asyncError(async (req, res, next) => {
  const { id } = req.params;
  let blog = await Blog.findById(id);

  if (!blog) {
    return next(new ErrorHandler("Blog not found", 404));
  }

  const newBlogData = {
    title: req.body.title || blog.title,
    intro: req.body.intro || blog.intro,
    category: req.body.category || blog.category,
    paraOneTitle: req.body.paraOneTitle || blog.paraOneTitle,
    paraTwoTitle: req.body.paraTwoTitle || blog.paraTwoTitle,
    paraOneDesc: req.body.paraOneDesc || blog.paraOneDesc, // Retain the old value if not provided
    paraTwoDesc: req.body.paraTwoDesc || blog.paraTwoDesc, // Retain the old value if not provided
    published: req.body.published === undefined ? blog.published : req.body.published,
  };

  

  // Handle image uploads
  if (req.files) {
    const { mainImage, paraOneImage, paraTwoImage } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (mainImage && allowedFormats.includes(mainImage.mimetype)) {
      const oldImageId = blog.mainImage?.public_id;
      if (oldImageId) await cloudinary.uploader.destroy(oldImageId);

      const newMainImage = await cloudinary.uploader.upload(mainImage.tempFilePath);
      newBlogData.mainImage = {
        public_id: newMainImage.public_id,
        url: newMainImage.secure_url,
      };
    }

    if (paraOneImage && allowedFormats.includes(paraOneImage.mimetype)) {
      const oldParaOneId = blog.paraOneImage?.public_id;
      if (oldParaOneId) await cloudinary.uploader.destroy(oldParaOneId);

      const newParaOneImage = await cloudinary.uploader.upload(paraOneImage.tempFilePath);
      newBlogData.paraOneImage = {
        public_id: newParaOneImage.public_id,
        url: newParaOneImage.secure_url,
      };
    }

    if (paraTwoImage && allowedFormats.includes(paraTwoImage.mimetype)) {
      const oldParaTwoId = blog.paraTwoImage?.public_id;
      if (oldParaTwoId) await cloudinary.uploader.destroy(oldParaTwoId);

      const newParaTwoImage = await cloudinary.uploader.upload(paraTwoImage.tempFilePath);
      newBlogData.paraTwoImage = {
        public_id: newParaTwoImage.public_id,
        url: newParaTwoImage.secure_url,
      };
    }
  }

  try {
    blog = await Blog.findByIdAndUpdate(id, newBlogData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!blog) {
      return next(new ErrorHandler("Failed to update blog", 500));
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully!",
      blog,
    });
  } catch (error) {
    console.error("Error during blog update:", error);
    return next(new ErrorHandler("Blog update failed", 500));
  }
});

