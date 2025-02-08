import mongoose from "mongoose";

export const db=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"BLOGGING-APP"
    })
    .then(()=>{
        console.log("Database Connected");
    }).catch(err=>{
        console.log(`Error Occured:${err}`);
    });
}