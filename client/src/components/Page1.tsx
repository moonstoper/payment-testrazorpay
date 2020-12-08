import React, { useEffect } from "react";
import * as actions from "../actions/";
import {  useDispatch, useSelector } from "react-redux";
import { Button, Card, CardHeader, TextField,CircularProgress, CardContent, Typography, CardActions } from "@material-ui/core";
import loadscript from "../functional/loadscript";
import {  useHistory } from "react-router-dom";
import {Alert} from "@material-ui/lab";
import homemini from "../assets/homemini.jpg"
import Checkuser from "./Checkuser"
const Page1: React.FC = () => {
 
  const orderdetails = {
    product_name: "Product1",
    orderamount: 5000,
    reciept: "jsde42022",
  };
  const dispatch = useDispatch();
  dispatch(actions.delete_paymnetdata())
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

  function userdetails()
  {
    dispatch(actions.user_data())
    // history.push("/user")
  }
  return (
    <div>
      Page1
      
      <Alert severity="warning" >Payment</Alert>
      <img src={homemini}></img><br/>Name : {orderdetails.product_name}&nbsp; <br/>Amount:Rs{orderdetails.orderamount}<br/>
      <Button variant="contained" color="primary" onClick={loadRazer} >pay amount</Button>
      <Checkuser></Checkuser>
      {/* <Card>
      { 
        detailsprint()
      }<CardActions>
       <Button variant="contained" color="secondary" onClick ={userdetails}>Check / Click to refresh after payment</Button>
    </CardActions></Card> */}
    </div>
  );
};

export default Page1;
