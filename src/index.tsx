import React from "react";
import ReactDom from "react-dom";
import App from "./components/app";
import { Provider } from "react-redux";
import store from "./store/store";

const root = document.getElementById("root");
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
