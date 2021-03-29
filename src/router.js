import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Common from "./common";
import NoMatch from "./pages/nomatch";
import Login from "./pages/login";
import Home from "./pages/home";
import Buttons from "./pages/ui/buttons";
import Modals from "./pages/ui/modals";
import Loading from "./pages/ui/loading";
import Notification from "./pages/ui/notification";
import Message from "./pages/ui/message";
import Tabs from "./pages/ui/tab";
import Gallery from "./pages/ui/gallary";
import Carousel from "./pages/ui/carousel";
import FormLogin from "./pages/form/login";
import FormReg from "./pages/form/reg";
import BasicTable from "./pages/tables/basicTable";
import HighTable from "./pages/tables/highTable";
import City from "./pages/city/city.jsx";
import Order from "./pages/order/order.jsx";
import OrderDetail from "./pages/order/detail.jsx";
import User from "./pages/user/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar/bar";
import Pie from "./pages/echarts/pie/pie";
import Line from "./pages/echarts/line/line";
import RichText from "./pages/rich/rich";
import Permission from "./pages/permission/permission";

export default class IRouter extends React.Component {
  render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            {/* <Route path="/">
                            <Redirect to="/admin"></Redirect>
                        </Route> */}
            <Route path="/login" component={Login}></Route>
            <Route
              path="/common"
              render={() => {
                return (
                  <Common>
                    <Route
                      path="/common/order/detail/:orderId"
                      component={OrderDetail}
                    />
                  </Common>
                );
              }}
            ></Route>
            <Route
              path="/"
              render={() => {
                return (
                  <Admin>
                    <Switch>
                      <Route path="/home" component={Home} />

                      <Route path="/ui/buttons" component={Buttons} />
                      <Route path="/ui/modals" component={Modals} />
                      <Route path="/ui/loadings" component={Loading} />
                      <Route path="/ui/notification" component={Notification} />
                      <Route path="/ui/messages" component={Message} />
                      <Route path="/ui/tabs" component={Tabs} />
                      <Route path="/ui/gallery" component={Gallery} />
                      <Route path="/ui/carousel" component={Carousel} />

                      <Route path="/form/login" component={FormLogin} />
                      <Route path="/form/reg" component={FormReg} />

                      <Route path="/table/basic" component={BasicTable} />
                      <Route path="/table/high" component={HighTable} />

                      <Route path="/city" component={City} />

                      <Route path="/order" component={Order} />

                      <Route path="/user" component={User} />

                      <Route path="/bikeMap" component={BikeMap} />

                      <Route path="/echarts/bar" component={Bar} />
                      <Route path="/echarts/pie" component={Pie} />
                      <Route path="/echarts/line" component={Line} />

                      <Route path="/rich" component={RichText} />

                      <Route path="/permission" component={Permission} />

                      <Redirect path="/" to="/home" />
                      {/* 这里其实下面的404不生效，因为已经被重定向了 */}
                      <Route component={NoMatch} />
                    </Switch>
                  </Admin>
                );
              }}
            ></Route>
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
