import express from "express";
import {profile} from "../controllers/posts.js";
const profilerouter = express.Router()
profilerouter.get("/",profile);
export default profilerouter;