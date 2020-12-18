
import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../actions/";
import logo from "../logo.svg";
import  Alert  from '@material-ui/lab/Alert';
const PaymentPage: React.FC = () => { // this page starts the payment where user fill paymnet details to checkout
  const res = useSelector((state) => state);
  const history = useHistory();
  console.log(res)
  let redx: any;
  useEffect(() => {
    redx = JSON.parse(JSON.stringify(res));
    if (redx.payment_status!==null ) { // checking if there is a successfull callback of paymnet completion
      if( redx.payment_status.msg === "success")
    {  history.push("/payment_page/updateTransactions");} //if yes move to next page "Transaction Update" to update database
      else{
        alert("paymnet failed.. Try again");
        history.push("/") // try again (i have to make this code better ** bad error handling)
      }
    } else console.log("ooh come on");
  });

  const dispatch = useDispatch();
  function DisplayPayment() {//setting up paymnet script and loading it up  
    if (redx.payment===null) {
      alert("Offline");
    }
    const options = { ///creating details to send to psp server
      key: "rzp_test_j9UI9PNWEZNmJN",
      amount: redx.payment.amount.toString(),
      currency: redx.payment.currency,
      name: redx.payment.product_name,
      description: "Test",
      image: { logo },
      order_id: redx.payment.id,
      handler: async function (response: any) { // communicationg with psp server and getting callback as response
        const data = {
          orderCreationId: redx.payment.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          amount: options.amount,
          description: options.description,
          date: new Date(),
        };
        dispatch(actions.payment_handler(data));//dispatching response to server to verify the payment 
      },

      prefill: {
        name: "Suraj Kachhap",
        email: "sja@as.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new (window as any).Razorpay(options); //opening the window for psp gateway
    paymentObject.open();
  }
  function displaypaymentdetails() // displaing some info about order details
  { const redx = JSON.parse(JSON.stringify(res));
    if(redx.payment!==null)
    return(<div>
      <div>Product:{redx.payment.product_name}</div>
      <div>Amount:{(redx.payment.amount/100).toString()}</div>
      <div>OrderId: {redx.payment.id}</div>
      </div>
    )
  }
  return (
    <div>
      {displaypaymentdetails()}
      <Alert severity="warning">Amount will be deducted .You Sure</Alert>
       <Button variant="contained" color="primary" onClick={DisplayPayment }>Confirm Order</Button>
      Payment page
    </div>
  );
};
export default PaymentPage;
