import React from 'react';
import logo from './logo.svg';
import{BrowserRouter,Route} from "react-router-dom";
import './App.css';
import Page1 from "./components/Page1"
import Paymentpage from "./functional/PaymentPage";
import Update_Transaction from "./functional/TransactionUpdate"
import LoginPage from "./components/LoginPage"
import axios from "axios"
const App:React.FC=()=> {
  
  return(
    <div>
      <BrowserRouter>
      <Route exact path="/login" component={LoginPage}></Route>
      <Route exact path="/" component={Page1}></Route>
      <Route exact path="/payment_page" component={Paymentpage}></Route>
      <Route exact path="/payment_page/updateTransactions" component={Update_Transaction}></Route>
      </BrowserRouter>
    </div>
  )
};
   

export default App;
