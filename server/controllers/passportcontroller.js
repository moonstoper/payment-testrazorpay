import userprofile from "../models/profiles.js";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";



export const loginprofile = (req,res,next) =>{
    console.log("in the controller section",req.body)
    passport.authenticate("local",(e,user,done)=>{ //calling passport local method for authentication
        console.log("callback")
        if(e) {
            console.log(e.message) // error  occured while calling passport
            return res.json(null);}
        if(!user){ 
            console.log("no user found") //if no user was found
            return res.json(null);}
        else{
            console.log(user,next) // user found and details dispatched
         return res.status(202).json(user)
        }
    })(req,res,next)

   
}