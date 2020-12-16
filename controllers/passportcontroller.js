import userprofile from "../models/profiles.js";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";



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
    passport.authenticate("local",(e,user,done)=>{
        console.log("heloooooooo")
        if(e) {
            console.log(e.message)
            res.json(null);}
        if(!user){ 
            console.log("no user found")
            res.json(null);}
        else{
            console.log("User")
         res.json(user)
        }
    })(req,res,next)

   
}