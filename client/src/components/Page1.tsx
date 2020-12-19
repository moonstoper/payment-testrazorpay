import React, { useEffect, useState } from "react";
import * as actions from "../actions/";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import loadscript, {
  checkin,
  recieptgenerator,
  LoadRazer,
} from "../functional/loadscript";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import homemini from "../assets/homemini.jpg";
import Checkuser from "./Checkuser";
const Page1: React.FC = () => { // the front page or the paymnet page after which the payment process begins
  const res = useSelector((state: RootStateOrAny) => state.user_info);
  const [chkdate, setchkdate] = useState(""); // getting checkin date
  const [coutdate, setcoutdate] = useState(""); // getting checkout date
  console.log(res);
  const orderdetails = { // creating payment object to be send to server to create payment instance
    product_name: "Product1",
    orderamount: 5000,
    receipt: "",
    duepayment: 0,
    checkindate: chkdate,
    checkoutdate: coutdate,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.delete_paymnetdata());
    console.log(res);
  });
  function prepay() { // using the function to check if checkin date is more than 7 days 
    if (checkin(chkdate)) { // and provide a option to only pay 30% upfront and 70% later
      console.log("ok");
      return (
        <span>
          or
          <Button
            variant="contained"
            color="primary"
            onClick={() => callRazer(true)}
          >
            pay amount {orderdetails.orderamount * 0.3}
          </Button>
        </span>
      );
    }
  }
  let history = useHistory();
  async function callRazer(advancepay: boolean) {//calling function to load payment api in background start the paymnet process
    //taking a boolean as parameter to check if user is paying 70% or 30%
    if (LoadRazer()) { //loading script
      if (advancepay) { // modifying orderdetails 
        orderdetails.duepayment = orderdetails.orderamount * 0.7;
        orderdetails.orderamount = orderdetails.orderamount * 0.3;
      }
      if (res === null) { //checking user if no send to login screen
        console.log("heee");
        history.push("/login");
        console.log("not pushed");
      } else { //if yess generate a receipt by calling a function
        if (orderdetails.receipt === "") {
          orderdetails.receipt = recieptgenerator(res);
          console.log(orderdetails);
        }// dispatching our orderdetails to server 
        dispatch(actions.get_payment(orderdetails));
        console.log("here");
        history.push("/payment_page");
      }
    }
  }
  function user() { // simple top button which either show user name or login link
    if (res === null) return <span>login</span>;
    else {
      var redx = JSON.parse(JSON.stringify(res));
      console.log(redx);
      return <span>Hi {redx.username}</span>;
    }
  }
  return (
    <div>
      Page1
      <Alert severity="warning">Payment</Alert>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => history.push("/login")}
      >
        {user()}
      </Button>
      <a href="/register_user"> Register</a>
      <br />
      <img src={homemini} alt="pg_img"></img>
      <br />
      <label id="checkin">Checkin Date</label>
      <input //checkin date input 
        id="checkin"
        type="date"
        onChange={(e) => setchkdate(e.target.value)}
      />
      <br />
      <label id="checkout">Checkout Date</label>
      <input //checkout date input
        id="checkout"
        type="date"
        onChange={(e) => setcoutdate(e.target.value)}
      />
      <br />
      Name : {orderdetails.product_name}&nbsp; <br />
      Amount:Rs{orderdetails.orderamount}
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => callRazer(false)}
      >
        pay amount {orderdetails.orderamount}
      </Button>
      {prepay()}
      <Checkuser></Checkuser>
      <a href="/userpage">USer</a>
    </div>
  );
};

export default Page1;
