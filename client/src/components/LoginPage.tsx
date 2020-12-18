import React, { useEffect, useState } from "react";
import {FormGroup,FormControl, Input, InputLabel, Button, FormHelperText} from "@material-ui/core"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/"
import { useHistory } from "react-router";
import "../style/login.css"
const LoginPage:React.FC = () =>{ /// USed for login :: user might jump to this on performing actions which can be 
    //only be done by a authenticated user
    console.log("---login pagge ---")
    const dispatch  = useDispatch()
    const res = useSelector((state:RootStateOrAny)=>state)
    const history = useHistory()
    const [user,setuser] = useState("");// storing onChange username
    const [passrd,setpasswrd] = useState("")//storing onChange password
    const obj = { //object created to send to server
        username: user,
        password : passrd
    }
 function checkuser() //check if user is loged in or not
 {      const redx =JSON.parse(JSON.stringify(res))
        console.log(redx)
        if(redx.user_info!==null)
        history.push("/")
 }
  
async function submitLogin(userdetails:object) //dispatching object to backend to verify user
{   const redx = JSON.parse(JSON.stringify(res))
    console.log("form submit-->")
    dispatch(actions.user_fetch(userdetails))
    if(redx!==null)
    history.push("/")
}
return(
    <div>
        <div className="loginblock">
            {checkuser()}
        <form onSubmit={()=>submitLogin(obj)}> // login form
        
            <InputLabel htmlFor="username">Username</InputLabel>
        <input type="text" name="username" onChange={e=>setuser(e.target.value)}/>
        <InputLabel htmlFor="password">Password</InputLabel>
        <input type="password" name="password" onChange={e=>setpasswrd(e.target.value)}/>
        <Button type="submit">Login</Button>
       </form>
        </div>
       
    </div>
)
}

export default LoginPage;