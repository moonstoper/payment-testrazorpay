import {
  Button,
  Card,
  CircularProgress,
  CardActions,
  Typography,
  CardContent,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import * as actions from "../actions";
import {LoadRazer,recieptgenerator} from "../functional/loadscript"
const Checkuser: React.FC = () => {
  const dispatch = useDispatch();
  const history =useHistory()
  const res = useSelector((state:RootStateOrAny) => state);
  console.log(res)
  const redx = JSON.parse(JSON.stringify(res));
  const paymentDue = (amount:number,_id:any,receipt:any) =>{
    // display user informations, bills
   const orderdetails ={  /// created order object for pending paymnet
      orderamount : amount,
      receipt :receipt,
      objectid : _id,
      duepayment : 0,

    }
    if(LoadRazer())//loading paymnet api
    if (res === null) {
      console.log("heee");
      history.push("/login");
      console.log("not pushed");
    } else {
      if(orderdetails.receipt === "")
      {
        orderdetails.receipt = recieptgenerator(res);
        console.log(orderdetails)
      }
      dispatch(actions.get_payment(orderdetails));
      console.log("here");
      history.push("/payment_page");
    }
    console.log(amount,_id)
  }
  const checkduepay = (duepayment:any,_id:any,receipt:any) =>{ //check if a payment is due 
    if(duepayment === 0)
    {
      return (<div>NO Due Remaining</div>)
    }
    else{ // create a button calling to paymentDue to initiate payment
      return <button onClick={()=>paymentDue(duepayment,_id,receipt)}>Pay RS.{duepayment}</button>
    }
  }
 
  function userdetails() {
    console.log(redx.user_info)
    if(redx.user_info!==null)
  {dispatch(actions.user_fetch({username:redx.user_info.username,password:redx.user_info.password}));
  detailsprint()}else{
    history.push("/login")
  }
  }
  function detailsprint() { // function for printing the order lists and other details
    console.log(redx)
    if (redx.user_info !== null) {
      // console.log(redx)
      const list = [];
      list.push(<li key="start"><b>Receipt&nbsp;Total&nbsp;DuePayment</b></li>)
      let count = 0;
      for (const [i, {_id,receipt,total,duepayment}] of redx.user_info.transid.entries()) { // create a list of orders
        if (count !== 5) {
          list.push(<li key={_id}>{receipt}&nbsp;RS.{total}&nbsp;{checkduepay(duepayment,_id,receipt)}</li>);
          count += 1;
        } else break;
      }
      return ( // returning th content along with format for rendering
        
        <div>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              User Details
            </Typography>
            <Typography variant="h5" component="h2">
              Username :{redx.user_info.username}
            </Typography>
            <Typography variant="body2" component="p">
              <br />
              {/* {redx.user_info.transid[0]}{console.log(list)} */}
              {list}
            </Typography>
          </CardContent>
        </div>
      );
    } else {
     
      return <div> login to display data</div>;
    }
  }

  return (
    <div>
      {console.log("checkuser")}
      <Card>
        {detailsprint()}
        <CardActions>
          <Button variant="contained" color="secondary" onClick={userdetails}>
            Check / Click to refresh after payment
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
export default Checkuser;
