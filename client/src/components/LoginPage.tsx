import React, { useEffect, useState } from "react";
import {FormGroup,FormControl, Input, InputLabel, Button, FormHelperText} from "@material-ui/core"
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import * as actions from "../actions/"
import { useHistory } from "react-router";
const LoginPage:React.FC = () =>{
    const dispatch  = useDispatch()
    const res = useSelector((state:RootStateOrAny)=>state)
    console.log("login pagge -->")
    const redx =JSON.parse(JSON.stringify(res))
    console.log(res)
    const history = useHistory()
    const [user,setuser] = useState("");
    const [passrd,setpasswrd] = useState("")
    const obj = {
        username: "suraj",
        password : "12345"
    }
 function checkuser()
 {      
        console.log(res)
 }
  
async function submitLogin(userdetails:object)
{   
    console.log("form submit-->")
    dispatch(actions.user_fetch(userdetails))
    // history.push("/")
}
return(
    <div>
        <div>
            {checkuser}
        <form onSubmit={()=>submitLogin(obj)}>
       <FormGroup >
           <FormControl>
               <InputLabel>UserName</InputLabel>
           <Input type="text" id="user-id" onChange={e => setuser(e.target.value)}></Input>
           <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
           </FormControl>
           <FormControl>
               <InputLabel>Password</InputLabel>
               <Input type="password" id="paswrd" onChange={e => setpasswrd(e.target.value)}></Input>
           </FormControl>
           <Button type="submit" variant="contained" color="primary">Login</Button>
       </FormGroup>
       </form>
        </div>
       
    </div>
)
}

export default LoginPage