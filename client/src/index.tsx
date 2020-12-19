import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/";
import { composeWithDevTools } from "redux-devtools-extension";
import serviceWorker from "./serviceworker"
import servicework from "./servicework"
import axios from "axios";
const store = createStore( // all services are defined and acclimated this is the main page
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}> //using redux store in app to get the state variables 
    <App />
  </Provider>,
  document.getElementById("root")
);
//serviceWorker();
servicework()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
