import jwt from "jsonwebtoken";
export const gentoken = (payload)=>{
    return jwt.sign(payload , process.env.JWT_SECRET , {expiresIn:"1h"});
}

export const verifytoken = (token)=>{
    return jwt.verify(token , process.env.JWT_SECRET);
}

export const genpwdforgettoken = (payload) =>{
    return jwt.sign(payload , process.env.JWT_SECRET,{expiresIn:"10m"});
}