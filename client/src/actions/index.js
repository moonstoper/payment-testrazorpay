import axios from "axios";

export const get_payment =(orderdetails) => async(dispatch) =>{

    try {
        const res = await axios.post("http://localhost:5000/activity/payments",orderdetails);
        // console.log(res);
        dispatch({type:"FETCH_ORDER",payload:res.data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const payment_handler =(data) => async(dispatch) =>{

    try {
        const res = await axios.post("http://localhost:5000/activity/payments/success",data);
        // console.log(res);
        dispatch({type:"FETCH_SUCCESS_ORDER",payload:res.data})
    }
    catch(error){
        console.log(error.message);
    }
}
export const update_transaction =(transaction_data) => async(dispatch) =>{

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
export const delete_paymnetdata = () => async(dispatch) =>{
    try{
        const res = null;
        dispatch({type:"UPDATE_TRANSACTION_DOCUMENT",payload:res.data})
        dispatch({type:"FETCH_ORDER",payload:res.data})
        dispatch({type:"FETCH_SUCCESS_ORDER",payload:res.data})

    }
    catch(error)
    {
        console.log(error.message)
    }
}