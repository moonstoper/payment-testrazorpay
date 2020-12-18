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

app.use(cors( // for cross origin 
  {origin:"http://localhost:3000",
  credentials:true}
));
app.use(
  cookie({ //using cookie and providing secret and cokkie age
    maxAge: 30 * 24 ** 60 * 60 * 1000,
    keys: ["324dsfsdimkdsmfiodsfmifmkldsmlksdmlkgmlksdmglmlfgml"],
  })
); 
app.use(morgan("tiny")) //for display post/get details
app.use(passport.initialize()) //firing up passport
app.use(passport.session()) //creating session
profilepass(passport) //using a single instance of passport throughout express
app.use("/activity", postRouter); // routes
app.use("/user",userroute); //routes



const PORT = 5000; // creating port at 5000
const connection_url =
  mongokey;
mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("logged in"));
mongoose.set("useFindAndModify", false); //coonecting to mongo database











app.get("/service-worker.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "service-worker.js"));
}); // trying to fire up service worker

console.log("Hello There");
console.log(PORT);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.listen(PORT);
