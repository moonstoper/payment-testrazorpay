import userprofile from "../models/profiles.js";
import passport from "passport";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

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

export default function(passport) { //creating local passport strategy 
  
  passport.use(
    new LocalStrategy((username, password, done) => {

      
      try{console.log(typeof(username))
     const user = userprofile.findOne({ username: username },(error,fnd)=>{ //chedckig data base using username
       console.log("hi",fnd);
       if(error) throw error;
       if(!fnd)
       {
         return done(null,false)
       }
       else{
         bcrypt.compare(password,fnd.password,(e,result)=>{ // comparing the hashes 
           if(e) throw e
           if(!result) return done(null,false)
           else {
            return done(null,fnd)
           }
         })
         
       }
     })
        
     
    }
      catch(error){
          console.log(error)
          return done(null,false)
      }
    })
  );

  passport.serializeUser((user,done)=>{ //storing the user credendtials in cookie when logged in
    done(null,user.id);
})
passport.deserializeUser((id,done)=>{ //removing user credendtials form cookie when logged out
    userprofile.findOne({_id:id},(error,done)=>{
      console.log("deserializing")
        done(error,user)
    })
})
}
