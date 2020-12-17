import express from "express";
import passport from "passport";
const profilerouter = express.Router()
import passportLocal from "passport-local";
import {loginprofile} from "../controllers/passportcontroller.js";

profilerouter.post("/login",loginprofile);
export default profilerouter;


