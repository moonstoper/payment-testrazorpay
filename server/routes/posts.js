import express from "express";
import {payment,paysuccess,transactionupdate,register} from "../controllers/posts.js"; //impoting functions from controllers
const router = express.Router();
router.post("/register",register); // serve route for registering user
router.post("/payments",payment); // route for creating order insatnce
router.post("/payments/success",paysuccess); //rouet for checking if payment was  successfull
router.post("/update/transaction",transactionupdate) //route fro updating databse
export default router;