import user from "../model/user.js";
import { gentoken, genpwdforgettoken, verifytoken } from "../service/jwtservice.js";
import { hashpwd, comparepwd } from "../service/hashservice.js";
import nodemailer from "nodemailer";
import dns from "dns";
import dotenv from "dotenv";
dns.setDefaultResultOrder('ipv4first');


async function clearLog(res,userId){
    try{
        const nooflogs = await ActionLog.find({userId : userId}).countDocuments();
        if(nooflogs>20){
            const excess = await ActionLog.find({userId}).sort({loggedAt:1}).limit(nooflogs-20);
            const deletelog = excess.map(doc=>doc._id);
            await ActionLog.deleteMany({_id:{$in:deletelog}})
        }
    }catch(error){
        res.status(400).json({message : "Couldnt clear the logs "})
    }
}


export const register = async(req,res)=>{
    try { 
        const { name , email , password} = req.body ; 
        const alrexist = await user.findOne({email});
        if(alrexist){
            return res.status(400).json({message : "User already exists"});}
            const hashed = await hashpwd(password);
        
            const u = new user({name , email , password  : hashed});
            await u.save() ; 

            res.status(201).json({message : "User has been registered "})
        }catch(err){
            res.status(500).json({error : err.message });
        }}
    

export const login = async(req,res)=>{
    try {
        const {email , password } = req.body ; 
        const u = await user.findOne({email});
        if(!u)return res.status(400).json({message : "Invalid Email or password "})
    
if(u.isBanned)return res.status(403).json({message : "User is banned "});
const isMatch = await comparepwd(password , u.password);
if(!isMatch)return res.status(400).json({message : "Invalid email or password " });

const token = gentoken({id : u._id , email : u.email , role : u.role  });
res.cookie("token",token,{
    httpOnly : true , 
    sameSite : "lax", 
    secure : false 
})
res.json({
    message : "login successful", token 
})
    }catch(err){
        res.status(500).json({error : err.message});
    }
}

export const googleAuth = async(req,res)=>{
    try{
    const user = req.user ; 
    if(user.isBanned)return res.status(403).json({message : "Account is banned"});
    const token = gentoken({id : user._id , email : user.email , role : user.role});
    res.cookie("token",token,{
            httpOnly : true ,
            sameSite: "lax",
            secure: false
        })
    res.redirect("http://localhost:5173/allvideos")
         }
    catch(err){
        res.status(500).json({error : err.message});
    }
    
}

export const logout = async(req,res)=>{
res.clearCookie("token",{
    httpOnly : true , 
    sameSite : "lax", 
    secure : false 
})
res.status(200).json({message : "Logged out"})

}


export const forgotpwd = async(req,res)=>{
    try {
        const transporter = nodemailer.createTransport({
            host : "smtp.gmail.com",
            port :465 , 
            secure : true , 
            family : 4 , 
            auth : {
                user : process.env.SMTP_USER , 
                pass : process.env.SMTP_PASS,
            }
        });
        const { email } = req.body ; 
        const alr = await user.findOne({email});
        if(!alr) return res.status(404).json({message :"User not found "})
        const token = genpwdforgettoken({id : alr._id});
        const info = await transporter.sendMail({
            from : process.env.SMTP_USER, 
            to : email , 
            subject : "Reset Password ", 
            text : "Hello ! ", 
            html : `<a href = "http://localhost:5173/reset-password/${token}">
            D-Stocks : Click here to reset your password </a>`
        });
    console.log("message send ");
    return res.status(200).json({message : "Email sent "}) 
 }catch(err){
    console.error("Error while send mail",err);
    return res.status(500).json({message : "Email failed to send "})
 }
}

export const resetpwd = async(req,res)=>{
    try { 
        const token = req.params.token ; 
        const verified = verifytoken(token);
        const { password} = req.body ; 
        const hashed = await hashpwd(password); 
        const  u = await user.findById(verified.id);
        if(!u) return res.status(404).json({message : "User not found "});
        u.password = hashed ; 
        await u.save();
        return res.status(200).json({
            message : "Password resetted"
        }); 
}catch(err){
    return res.status(400).json({message : "Invalid token "})
}
}

export const banuser = async(req,res)=>{
    const id = req.params.id ; 
    const u = await user.findById(id); 
    if(!u) return res.status(400).json({message  :"User does not exist "});
    u.isBanned = true ; 
    await u.save(); 
    res.status(200).json({message : `${u.name} has been banned`})
}


export const getUserInfo = async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        const userresp = {
            name : user.name , 
            email : user.email , 
            coins : user.coins,
        }
        res.status(200).json(userresp);
    }catch(error){
    res.status(404).json({message : "Couldnt get user info "})
}}