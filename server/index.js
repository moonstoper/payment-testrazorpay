import express from "express";
import mongoose from "mongoose";
import {mongokey} from "./config/keys.js"
import cors from "cors";
import postRouter from "./routes/posts.js";
import userroute from "./routes/profile.js"
import path from "path";
import morgan from "morgan"
import { fileURLToPath } from 'url';
import cookie from "cookie-session";
import passport from "passport";
import passportLocal from "passport-local"
import {default as profilepass} from  "./paspport/passportlocal.js"
const app = express();
const LocalStrategy = passportLocal.Strategy;

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors(
  {origin:"http://localhost:3000",
  credentials:true}
));
app.use(
  cookie({
    maxAge: 30 * 24 ** 60 * 60 * 1000,
    keys: ["324dsfsdimkdsmfiodsfmifmkldsmlksdmlkgmlksdmglmlfgml"],
  })
);
app.use(morgan("tiny"))
app.use(passport.initialize())
app.use(passport.session())
profilepass(passport)
app.use("/activity", postRouter);
app.use("/user",userroute);



// app.post("/user/login",(req,res,next)=>{
//   console.log("in the controller section",req.body);
//     passport.authenticate("local",(e,user,done)=>{
//         console.log("heloooooooo")
//         if(e) throw e;
//         if(!user) res.json("No user");
//         else{
//             req.logIn(user,e =>{
//                 if(e) throw e;
//                 res.json("Success Authenticate")
//             })
//         }
//     })(req,res,next)
// })







const PORT = 5000;
const connection_url =
  mongokey;
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("logged in"));
mongoose.set("useFindAndModify", false);













console.log("Hello There");
console.log(PORT);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.listen(PORT);
