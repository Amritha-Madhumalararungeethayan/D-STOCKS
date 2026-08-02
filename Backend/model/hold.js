
import mongoose from "mongoose";
const holdings = new mongoose.Schema(
    {
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
    quantity:{
            type:Number , 
            required :true , 
            default : 0 ,
        },
    buyprice:{
            type:Number,
            required :true , 
            default : 0 , 
        },

    },{ timestamps: true }
)

holdings.index({user:1,stock:1},{unique : true });
export default mongoose.model("Holding" , holdings);