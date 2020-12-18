import express from "express";
import passport from "passport";
const profilerouter = express.Router()
import passportLocal from "passport-local";
import {loginprofile} from "../controllers/passportcontroller.js"; //importing profile function from controller

profilerouter.post("/login",loginprofile); //route for user login
export default profilerouter;


