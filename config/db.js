import mongoose from "mongoose";
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO DB connected ")}
    catch(err){
        console.error("Mongo DB couldnt connect , err.message ");

    }
    }
export default connectDB;