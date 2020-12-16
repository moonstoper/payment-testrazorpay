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
import axios from "axios";
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("./serviceworker.js").then(
      function (registration) {
        console.log(
          "Service Worker registered successfully with scope",
          registration.scope
        );
      },
      function (error) {
        console.log("ServiceWorker registrayon failed", error);
      }
    );
  });
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
