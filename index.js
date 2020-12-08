import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import postRouter from "./routes/posts.js";
import userprofile from "./routes/profile.js"
import path from "path";
import morgan from "morgan"
import { fileURLToPath } from 'url';
import cookie from "cookie-session";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(
  cookie({
    maxAge: 30 * 24 ** 60 * 60 * 1000,
    keys: ["324dsfsdimkdsmfiodsfmifmkldsmlksdmlkgmlksdmglmlfgml"],
  })
);
app.use(cors());
app.use(morgan("tiny"))
app.use("/activity", postRouter);
app.use("/user",userprofile);
const PORT = 5000;
const connection_url =
  "mongodb+srv://suraj-upi:5Jbqba4vUkeZNmSM@cluster0.m7isg.mongodb.net/upiprofile?retryWrites=true&w=majority";
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
