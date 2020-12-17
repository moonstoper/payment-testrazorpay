import mongoose from "mongoose";
import userprofile from "../models/profiles.js";
import transaction from "../models/transaction.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { mongokey, razor_key_id, razor_key_secret } from "../config/keys.js";
export const profile = async (req, res) => {
  try {
    console.log("profile");
    const Userprofile = await userprofile.findOne({ username: "surajk" });
    res.json(Userprofile);
    console.log(Userprofile);
  } catch (error) {
    res.status(500);
  }
};

export const payment = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: razor_key_id,
      key_secret: razor_key_secret,
    });
    // console.log("created instance",req.body);
    const options = {
      amount: req.body.orderamount * 100,
      currency: "INR",
      receipt: req.body.receipt,
    };
    // console.log("reached payment",options);
    const payorder = await instance.orders.create(options);

    payorder.product_name = req.body.product_name;
    payorder.duepayment = req.body.duepayment;
    if (!payorder) return res.status(500).send("Some error occurred");

    res.status(200).json(payorder);
  } catch (error) {
    res.status(404).send(error);
  }
};
export const paysuccess = async (req, res) => {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const digest = crypto
      .createHmac("sha256", "uooir37C3ZPC5xcKQzFdZ8fr")
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not confirmed" });

    res.status(200).json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).json({ msg: "Transaction not confirmed" });
  }
};

export const transactionupdate = async (req, res) => {
  try {
    console.log("transaction update-->");
    const connection_url = mongokey;
    mongoose
      .connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("logged in"));

    console.log(req.body.payment.duepayment);
    if (req.body.payment.duepayment > 0) {
      console.log("pendingpay")
      await userprofile
        .updateOne(
          {
            username: req.body.user_info.username,
          },
          {
            $push: {
              transid: {
                $each: [req.body.payment_status.orderId],
                $position: 0,
              },
            },
          },
          {
            $set:{pendingPayment:{
              receipt:"hello",
              amount:3000
            }}
          }
        )
        .then(console.log("updated profile"));
    } else {
      console.log("no pending pay")
      await userprofile
        .updateOne(
          {
            username: req.body.user_info.username,
          },
          {
            $push: {
              transid: {
                $each: [req.body.payment_status.orderId],
                $position: 0,
              },
            },
          }
        )
        .then(console.log("updated profile"));
    }

    await transaction
      .create({
        transaction_id: req.body.payment_status.paymentId,
        amount: req.body.payment.amount,
        payee_name: "Suraj",
        name: req.body.payment.product_name,
        description: req.body.payment.description,
        receipt: req.body.payment.receipt,
        order_id: req.body.payment_status.orderId,
      })
      .then(console.log("updated transactions"));
    res.status(200).json({
      msg: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
