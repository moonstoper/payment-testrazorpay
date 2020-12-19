//coonect to server side dispatches returned information to gloabal state variables
import axios from "axios";
export const get_payment =(orderdetails) => async(dispatch) =>{   // to create razorpay order

    try {
        const res = await axios.post("http://localhost:5000/activity/payments",orderdetails);
        console.log(res);
        dispatch({type:"FETCH_ORDER",payload:res.data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const payment_handler =(data) => async(dispatch) =>{  // check if payment is successfull

    try {
        const res = await axios.post("http://localhost:5000/activity/payments/success",data);
        console.log(res);
        dispatch({type:"FETCH_SUCCESS_ORDER",payload:res.data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const update_transaction =(transaction_data) => async(dispatch) =>{ //update userprofile and other schemas regarding transaction

    try {
        console.log("axios-->");
        const res = await axios.post("http://localhost:5000/activity/update/transaction",transaction_data);
        console.log(res);
        dispatch({type:"UPDATE_TRANSACTION_DOCUMENT",payload:res.data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const delete_paymnetdata = () => async(dispatch) =>{ //clear payment data after completion
    try{
        console.log("deleting.....")
        const res = [];
        console.log(res)
        dispatch({type:"UPDATE_TRANSACTION_DOCUMENT",payload:res.data})
        dispatch({type:"FETCH_ORDER",payload:res.data})
        dispatch({type:"FETCH_SUCCESS_ORDER",payload:res.data})

    }
    catch(error)
    {
        console.log(error.message)
    }
}
export const user_fetch = (user_fetch) => async(dispatch) =>{  //fetching user info
    try {console.log("axios-->")
        const res = await axios.post("http://localhost:5000/user/login",user_fetch);
        dispatch({type:"USER_INFO",payload:res.data})
        console.log("dispatched");
    } catch (error) {
        console.log(error.message)
    }
}

export const create_user = (register_info) => async(dispatch) =>{
    try {
        console.log("register ->>")
        const res = await axios.post("http://localhost:5000/activity/register",register_info);
        dispatch({type:"USER_INFO",payload:res.data})
        console.log("dispatched response")
    } catch (error) {
        console.log(error.message)
    }
}