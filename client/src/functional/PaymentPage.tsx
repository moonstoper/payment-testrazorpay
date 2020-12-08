import { red } from "@material-ui/core/colors";
import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../actions/";
import logo from "../logo.svg";
import  Alert  from '@material-ui/lab/Alert';
const PaymentPage: React.FC = () => {
  const res = useSelector((state) => state);
  const history = useHistory();
  let redx: any;
  useEffect(() => {
    redx = JSON.parse(JSON.stringify(res));
    if (redx.payment_status! ) {
      if( redx.payment_status.msg === "success")
    {  history.push("/payment_page/updateTransactions");}
      else{
        alert("paymnet failed.. Try again");
        history.push("/")
      }
    } else console.log("ooh come on", redx);
  });

  const dispatch = useDispatch();
  function DisplayPayment() {
    if (!redx.payment) {
      alert("Offline");
    }
    const options = {
      key: "rzp_test_j9UI9PNWEZNmJN",
      amount: redx.payment.amount.toString(),
      currency: redx.payment.currency,
      name: redx.payment.product_name,
      description: "Test",
      image: { logo },
      order_id: redx.payment.id,
      handler: async function (response: any) {
        const data = {
          orderCreationId: redx.payment.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          amount: options.amount,
          description: options.description,
          date: new Date(),
        };
        dispatch(actions.payment_handler(data));
      },

      prefill: {
        name: "Suraj Kachhap",
        email: "sja@as.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  }
  return (
    <div>
      <Alert severity="warning">Amount will be deducted .You Sure</Alert>
       <Button variant="contained" color="primary" onClick={DisplayPayment }>Confirm Order</Button>
      Payment page
    </div>
  );
};
export default PaymentPage;
