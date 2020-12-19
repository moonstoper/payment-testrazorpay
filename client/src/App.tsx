import React from 'react';
import{BrowserRouter,Route} from "react-router-dom";
import './App.css';
import Page1 from "./components/Page1"
import Paymentpage from "./functional/PaymentPage";
import Update_Transaction from "./functional/TransactionUpdate"
import {default as UserPage} from "./components/Checkuser"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
const App:React.FC=()=> {
  ///all navigation routes are defines here
  return(
    <div>
      <BrowserRouter>
      
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/userpage" component={UserPage}></Route>
      <Route exact path="/" component={Page1}></Route>
      <Route exact path="/register_user" component={RegisterPage}></Route>
      <Route exact path="/payment_page" component={Paymentpage}></Route>
      <Route exact path="/payment_page/updateTransactions" component={Update_Transaction}></Route>
      </BrowserRouter>
    </div>
  )
};
   

export default App;
