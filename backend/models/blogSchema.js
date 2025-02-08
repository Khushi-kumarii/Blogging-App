import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[8, "Title must contain 8 characters!"],
        maxLength:[50, "Title cannot exceed 50 characters!"], //  Message should match maxLength
    },
    mainImage:{
        public_id:{
            type:String,
            required:true
          },
          url:{
            type:String,
            required:true,
          },
    },
    intro:{
       type:String,
       required:true,
       minLength:[250, "Intro must be 250 characters!"],
    },

    paraOneImage:{
        public_id:{
            type:String,
          },
          url:{
            type:String,
          },
    },
    paraOneDesc:{
        type:String,
        required: [true, "Description is required!"], // Enforces that paraOneDesc must have a value
        minLength:[50, "Description must be 50 characters!"],
    },
    paraOneTitle:{
        type:String,
        validate: {
            validator: function (value) {
                // Only validate if a value exists
                return !value || value.length >= 30;
            },
            message: "Title must be at least 30 characters!",
        },
    },
    
    paraTwoImage:{
        public_id:{
            type:String,
          },
          url:{
            type:String,
          },
          
    },
    paraTwoDesc:{
        type:String,
        required: false, // Make the field optional
        default: undefined, // Prevent validation for missing fields

    },
    paraTwoTitle:{
        type:String,
        required: false, // Make the field optional
        default: undefined, // Prevent validation for missing fields

    },
    category:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    authorName:{
        type:String,
        required:true,
    },
    authorAvatar:{
        type:String,
        required:true,
    },
    published:{
        type:Boolean,
        default:false,
    },

});

export const Blog=mongoose.model("Blog",blogSchema);