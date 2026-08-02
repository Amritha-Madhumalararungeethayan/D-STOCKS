import mongoose  from "mongoose";



const trades = new mongoose.Schema({

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required :true , 
        },
    stock:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Stock",
            required :true , 
        },
    type:{
            type:String , 
            required :true , 
            enum: ["buy", "sell"],
        },

    quantity:{
            type:Number,
            required :true , 
        },
    price:{
            type:Number,
            required :true , 
        },        
},{timestamps : true });



export default mongoose.model("Trade",trades)