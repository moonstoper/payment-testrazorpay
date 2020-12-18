import userprofile from "../models/profiles.js";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";

// controller for passports and other authentications

// export const profile = async(req,res) =>{
//   try { const saltRounds = 10
//         const user = await userprofile.findOne({username:req.body.username}).then(console.log("found user"))
//         if(!user)
//         {    let newuser;
//            await bcrypt.genSalt(saltRounds,(err,salt)=>{
//                 bcrypt.hash(req.body.passwrd,salt,(err,hash)=>{
//                 newuser = userprofile.create({
//                       username: req.body.username,
//                       password : hash
//                   })
//                 })
//            })
//            return res.json(newuser)
//         }
//         await bcrypt.compare(req.body.passwrd,user.password,(err,result)=>{
//             if(result)
//             {    console.log(user)
//                 return res.json(user)
//             }
//             else
//             {
//                 return res.json({message:"ERROR wrong password"})
//         }
//         })}
//     catch(error)
//     {
//         res.status(400).json("ERROR try again")
//     }

// }

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