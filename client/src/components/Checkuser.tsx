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
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";
const Checkuser: React.FC = () => {
  const dispatch = useDispatch();
  const res = useSelector((state) => state);
  console.log(res)
  const redx = JSON.parse(JSON.stringify(res));
  useEffect(()=>{
    
  })
  function userdetails() {
    dispatch(actions.user_fetch({username:"suraj",passwrd:"12345"}));
    detailsprint()
    // history.push("/user")
  }
  function detailsprint() {
    console.log(redx.user_info)
    if (redx.user_info !== null) {
      // console.log(redx)
      const list = [];
      let count = 0;
      for (const [i, product] of redx.user_info.transid.entries()) {
        if (count !== 5) {
          list.push(<li key={product}>{product}</li>);
          count += 1;
        } else break;
      }
      return (
        <span>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              User Details
            </Typography>
            <Typography variant="h5" component="h2">
              Username :{redx.user_info.username}
            </Typography>
            <Typography variant="body2" component="p">
              Last Order ID:
              <br />
              {/* {redx.user_info.transid[0]}{console.log(list)} */}
              {list}
            </Typography>
          </CardContent>
        </span>
      );
    } else {
      dispatch(actions.user_fetch({username:"suraj",passwrd:"12345"}));
      return <div>network error</div>;
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
