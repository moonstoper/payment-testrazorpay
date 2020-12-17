import express from "express";
import {payment,paysuccess,transactionupdate,profile} from "../controllers/posts.js";
const router = express.Router();
router.post("/user",profile);
router.post("/payments",payment);
router.post("/payments/success",paysuccess);
router.post("/update/transaction",transactionupdate)
export default router;