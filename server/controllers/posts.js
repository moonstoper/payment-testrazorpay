//handles all the post,get,fetch calls from client
import mongoose from "mongoose";
import userprofile from "../models/profiles.js";
import transaction from "../models/transaction.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { genSalt, hash } from "bcrypt";
import { mongokey, razor_key_id, razor_key_secret } from "../config/keys.js";
export const register = async (req, res) => {
  //register the user
  try {
    console.log("profile");
    const user = await userprofile.findOne({ username: req.body.username }); // checking if user already present
    if (!user) {
      var newuser;
      await genSalt((err, salt) => {
        if (err) throw err;
        hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          userprofile.create(
            {
              username: req.body.username,
              password: hash,
            },
            (err, result) => {
              if (err) throw err;
              if (result) {
                result.message = "success reg";
                console.log("hi created new user",result);
                return res.json(result);
              } else {
                console.log("failed to create new doc");
                return res.json({ message: "error making doc" });
              }
            }
          );
        });
      });
    } else {
      console.log("User already");
      return res.json({ message: "User already present" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User error occurred" });
  }
};

export const payment = async (req, res) => {
  // creating order instance
  try {
    const instance = new Razorpay({
      key_id: razor_key_id,
      key_secret: razor_key_secret,
    });
    console.log("created instance", req.body);
    const options = {
      // cretaing options obj to create order instance
      amount: req.body.orderamount * 100,
      currency: "INR",
      receipt: req.body.receipt,
    };
    console.log("reached payment", options);
    const payorder = await instance.orders // creating order instance
      .create(options)
      .then(console.log("payorder created"));
    //adding some extra parmaters to instance for future use while updating database
    payorder.product_name = req.body.product_name;
    payorder.duepayment = req.body.duepayment;
    payorder.checkindate = req.body.checkindate;
    payorder.checkoutdate = req.body.checkoutdate;
    if (req.body.objectid) payorder.objectid = req.body.objectid;
    console.log("payorder-->", payorder); // check if there was an error with error or not and the send it to client
    if (!payorder) return res.status(500).send("Some error occurred");

    res.status(200).json(payorder);
  } catch (error) {
    //handling error occurend during any above proccess
    console.log(error);
    res.status(404).send(error);
  }
};
export const paysuccess = async (req, res) => {
  //after payment verify if payment was successfull or not
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;
    const digest = crypto //crypting and merging order id and paymnet id
      .createHmac("sha256", "uooir37C3ZPC5xcKQzFdZ8fr")
      .update(`${orderCreationId}|${razorpayPaymentId}`)
      .digest("hex");
    if (digest !== razorpaySignature)
      // verifying paymnet
      return res.status(400).json({ msg: "Transaction not confirmed" });

    res.status(200).json({
      // sending if successfull
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).json({ msg: "Transaction not confirmed" }); // if not successfully
  }
};

export const transactionupdate = async (req, res) => {
  // updating databse after successfully payment
  try {
    console.log("transaction update-->");
    const connection_url = mongokey; //re establing connection  with databse (not necessary)
    mongoose
      .connect(connection_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("logged in"));

    console.log(req.body.payment.duepayment);

    console.log("pendingpay");
    if (req.body.payment.objectid !== undefined) {
      //checking if it was pending payment
      console.log("updating due", req.body.payment.objectid);
      await userprofile
        .updateOne(
          {
            username: req.body.user_info.username,
            transid: {
              $elemMatch: { _id: req.body.payment.objectid },
            },
          },
          {
            $set: {
              "transid.$.duepayment": 0,
            },
            $inc: {
              "transid.$.paid": req.body.payment.amount / 100,
            },
          }
        )
        .then("updated pending paymnet");
    } // if a new payment
    else {
      await userprofile
        .updateOne(
          {
            username: req.body.user_info.username,
          },
          {
            $push: {
              transid: {
                $each: [
                  {
                    receipt: req.body.payment.receipt,
                    duepayment: req.body.payment.duepayment,
                    total:
                      req.body.payment.amount / 100 +
                      req.body.payment.duepayment,
                    paid: req.body.payment.amount / 100,
                    checkindate: req.body.payment.checkindate,
                    checkoutdate: req.body.payment.checkoutdate,
                  },
                ],
                $position: 0,
              },
            },
          }
        )
        .then(console.log("updated profile due"));
    }
    let receipt
    if(req.body.payment.objectid!==undefined)
    {
      receipt = req.body.payment.objectid
    }
    else receipt = req.body.payment.receipt
    await transaction //create a object for transaction
      .create({
        transaction_id: req.body.payment_status.paymentId,
        amount: req.body.payment.amount / 100,
        payee_name: "Suraj",
        name: req.body.payment.product_name,
        description: req.body.payment.description,
        receipt: receipt,
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
