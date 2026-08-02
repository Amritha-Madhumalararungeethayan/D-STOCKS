import { verifytoken } from "../service/jwtservice.js";

export default (req,res,next)=>{
    const token = req.cookies?.token ; 
    if(!token){
        return res.status(401).json({message : "Invalid token "});
        
    }
    try { 
        const decoded = verifytoken(token);
        req.user = decoded ; 
        req.userId = decoded.id ;
        next() ; 
    }
    catch(err){
        res.clearCookie("token");
        res.status(401).json({message : "Invalid/Expired token "})
    }
};