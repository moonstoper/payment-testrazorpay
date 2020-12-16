import userprofile from "../models/profiles.js";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import mongoose from "mongoose"

const LocalStrategy = passportLocal.Strategy;

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

export default function(passport) {
  
  passport.use(
    new LocalStrategy((username, password, done) => {

      
      try{console.log(username)
      console.log(3+4)
     const user = userprofile.findOne({ username: username }).then(console.log("serached"))
     if(!user)
     {
       return done(null,null)
     }
      bcrypt.compare(password,user.password,(err,result)=>{
       if(err)
       {
         return done(null,null)
       }
       else{
         return done(null,user)
       }
     })
    }
      catch(error){
          console.log(error)
          return done(null,false)
      }
    })
  );

  passport.serializeUser((user,done)=>{
    console.log("serializing")
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{
    userprofile.findOne({_id:id},(error,done)=>{
      console.log("deserializing")
        done(error,user)
    })
})
}
