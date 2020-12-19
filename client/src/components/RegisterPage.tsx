import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector,RootStateOrAny } from "react-redux";
import "../style/login.css"
import {create_user} from "../actions/"
import { useHistory } from "react-router";
const RegisterPage:React.FC = ()=>{ // user registration page
    console.log("Register page-->")
    const history  = useHistory()
    const res= useSelector((state:RootStateOrAny)=>state.user_info)
    const redx =JSON.parse(JSON.stringify(res))
    const [username,setuser] = useState("");
    const [password,setpass] = useState("");
    const dispatch = useDispatch();
    const object ={
        username,
        password,
    }
    function checkuser() //check if user is loged in or not
    {      
           console.log(redx)
           if(redx!==null)
           history.push("/")
    }
    const submitRegister = () => { //dispathcing registratoin info

        dispatch(create_user(object))
    }
    return(
        <div>
            {checkuser()}
            <form className="loginblock" onSubmit={submitRegister}>
                <label htmlFor="username">
                    username
                </label>
                <input type="text" id="username" onChange={e=>setuser(e.target.value)}>
                </input>
                <label htmlFor="password">
                password
                </label>
                <input type="password" id="password" onChange={e=>setpass(e.target.value)}></input>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterPage;