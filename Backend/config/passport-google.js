import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../model/user.js";
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID , 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
    callbackURL : "http://localhost:5000/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, cb) => {
    try{
        let user = await User.findOne({email : profile.emails?.[0]?.value});
        if(!user){
            user = await User.create({
                googleId : profile.id , 
                name : profile.displayName , 
                email : profile.emails?.[0]?.value,
            });
        }
        else{
            if(!user.googleId){
                user.googleId = profile.id ; 
                await user.save()
            }
        }
        return cb(null,user);

    }
    catch(err){
        return cb(err,null);
    }
        
    }));
