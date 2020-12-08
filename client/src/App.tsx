import React from 'react';
import logo from './logo.svg';
import{BrowserRouter,Route} from "react-router-dom";
import './App.css';
import P1 from "./components/Page1"
import F_PP from "./functional/PaymentPage";
import Update_Transaction from "./functional/TransactionUpdate"
const App:React.FC=()=> {
  
  return(
    <div>
      <BrowserRouter>
      <Route exact path="/" component={P1}></Route>
      <Route exact path="/payment_page" component={F_PP}></Route>
      <Route exact path="/payment_page/updateTransactions" component={Update_Transaction}></Route>
      </BrowserRouter>
    </div>
  )
};
   

export default App;
