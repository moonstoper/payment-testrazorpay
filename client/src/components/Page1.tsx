import React, { useEffect, useState } from "react";
import * as actions from "../actions/";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import loadscript, { checkin } from "../functional/loadscript";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import homemini from "../assets/homemini.jpg";
import Checkuser from "./Checkuser";
const Page1: React.FC = () => {
  const res = useSelector((state: RootStateOrAny) => state.user_info);
  const [chkdate, setchkdate] = useState("");
  const [coutdate, setcoutdate] = useState("");
  console.log(res);
  const orderdetails = {
    product_name: "Product1",
    orderamount: 5000,
    receipt: "jsde42022",
    duepayment: 0,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.delete_paymnetdata());
  });
  function prepay() {
    if (checkin(chkdate)) {
      console.log("ok");
      return (
        <span>
          or
          <Button
            variant="contained"
            color="primary"
            onClick={() => loadRazer(true)}
          >
            pay amount {orderdetails.orderamount * 0.3}
          </Button>
        </span>
      );
    }
  }
  let history = useHistory();
  async function loadRazer(advancepay: boolean) {
    const construct = await loadscript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!construct) {
      alert("Razorpay sdk didn't load");
      return;
    } else {
      alert("loaded");
    }
    if (advancepay) {
      orderdetails.duepayment = orderdetails.orderamount * 0.7;
      orderdetails.orderamount = orderdetails.orderamount * 0.3;
    }
    if (res === null) {
      console.log("heee");
      history.push("/login");
      console.log("not pushed");
    } else {
      dispatch(actions.get_payment(orderdetails));
      console.log("here");
      history.push("/payment_page");
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
        Login
      </Button>
      <br />
      <img src={homemini} alt="pg_img"></img>
      <br />
      <label id="checkin">Checkin Date</label>
      <input
        id="checkin"
        type="date"
        onChange={(e) => setchkdate(e.target.value)}
      />
      <br />
      <label id="checkout">Checkout Date</label>
      <input
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
        onClick={() => loadRazer(false)}
      >
        pay amount {orderdetails.orderamount}
      </Button>
      {prepay()}
      <Checkuser></Checkuser>
    </div>
  );
};

export default Page1;
