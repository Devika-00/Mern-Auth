import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

const connectDatabase = asyncHandler(async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected Successfully");
    } catch (error) {
       throw new Error(); 
    }
});

export default connectDatabase;