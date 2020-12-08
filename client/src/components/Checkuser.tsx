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
  const redx = JSON.parse(JSON.stringify(res));
  function userdetails() {
    dispatch(actions.user_data());
    // history.push("/user")
  }
  function detailsprint() {
    if (redx.user_info !== null) {
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
              Last 5 Order ID:
              <br />
              {/* {redx.user_info.transid[0]}{console.log(list)} */}
              {list}
            </Typography>
          </CardContent>
        </span>
      );
    } else {
      dispatch(actions.user_data());
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
