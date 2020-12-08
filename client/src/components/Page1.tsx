import React, { useEffect } from "react";
import * as actions from "../actions/";
import {  useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, TextField } from "@material-ui/core";
import loadscript from "../functional/loadscript";
import {  useHistory } from "react-router-dom";
import {Alert} from "@material-ui/lab"
const Page1: React.FC = () => {
  useEffect(()=>{
    dispatch(actions.delete_paymnetdata())
  })
  const orderdetails = {
    product_name: "Product1",
    orderamount: 5000,
    reciept: "jsde42022",
  };
  const dispatch = useDispatch();
  var flag = false;
  const res = useSelector((state) => state);
  let history = useHistory();
  async function loadRazer() {
    const construct = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!construct) {
      alert("Razorpay sdk didn't load");
      return;
    } else {
      alert("loaded");
    }

    await dispatch(actions.get_payment(orderdetails));
    history.push("/payment_page");
  }

  return (
    <div>
      Page1<br/>
      <Alert severity="warning">Payment</Alert>
      <Button variant="contained" color="primary" onClick={loadRazer} >pay amount</Button>
      {/* <Card>{red!?red.payment : null}</Card> */}
    </div>
  );
};

export default Page1;
