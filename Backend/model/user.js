import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : { type : String , required : true}, 
    email : {type : String , required : true , unique :true},
    password : {type : String , required : false },
    isBanned  :{type : Boolean , default : false },
    role : {type : String , enum : ["user" , "admin"],default : "user"},

    coins :{type :Number , required:true , default :1000}
},{timestamps:true });

export default mongoose.model("User", userSchema);