import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as actions from "../actions/";
import  Alert  from '@material-ui/lab/Alert';
const TransactionUpdate: React.FC = () =>{ // updaing the transaction and profile collection after successfull payment
    const res = useSelector(state=>state);
    const history = useHistory();
    const dispatch = useDispatch()
    
    useEffect(()=>{
        const redx = JSON.parse(JSON.stringify(res))
        if(redx.transaction! && redx.transaction.msg==="updated successfully")//checking if update was succesfull and moving the product page
        {   
            history.push("/");

        }
        else {
            dispatch(actions.update_transaction(redx));
        }
    })
    return(
        <div>
            <Alert>This is a success alert — check it out!</Alert>
            Please be patience.......
        </div>
    )
}

export default TransactionUpdate;