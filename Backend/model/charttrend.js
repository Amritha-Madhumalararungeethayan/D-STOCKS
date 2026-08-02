import mongoose from "mongoose";

const chartprice = new mongoose.Schema({
    stock :{
        type : mongoose.Schema.Types.ObjectId, 
        ref :"Stock", 
        required : true 
    },
    price : {
        type : Number , 
        required : true 
    },
    time : {
        type : Date , 
        default : Date.now 
    }

});

export default mongoose.model("Chartdata",chartprice);