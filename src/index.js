import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import * as serviceWorker from "./serviceWorker";
import Router from "./router";
// import configureStore from './redux/store/configureStore'
// import {Provider} from 'react-redux'
// const store=configureStore();

// 通过ConfigProvider设置语言为中文
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

ReactDOM.render(
  // <Provider store={store}>
  //   <Router/>
  // </Provider>,
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
