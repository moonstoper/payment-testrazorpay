import express from "express";
import {payment,paysuccess,transactionupdate} from "../controllers/posts.js";
const router = express.Router();
router.post("/payments",payment);
router.post("/payments/success",paysuccess);
router.post("/update/transaction",transactionupdate)
export default router;