import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Common from "./common";
import NoMatch from "./pages/nomatch";
import Login from "./pages/login";
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
              path="/admin"
              render={() => {
                return (
                  <Admin>
                    <Switch>
                      <Route path="/admin/ui/buttons" component={Buttons} />
                      <Route path="/admin/ui/modals" component={Modals} />
                      <Route path="/admin/ui/loadings" component={Loading} />
                      <Route
                        path="/admin/ui/notification"
                        component={Notification}
                      />
                      <Route path="/admin/ui/messages" component={Message} />
                      <Route path="/admin/ui/tabs" component={Tabs} />
                      <Route path="/admin/ui/gallery" component={Gallery} />
                      <Route path="/admin/ui/carousel" component={Carousel} />

                      <Route path="/admin/form/login" component={FormLogin} />
                      <Route path="/admin/form/reg" component={FormReg} />

                      <Route path="/admin/table/basic" component={BasicTable} />
                      <Route path="/admin/table/high" component={HighTable} />

                      <Route path="/admin/city" component={City} />

                      <Route path="/admin/order" component={Order} />

                      <Route path="/admin/user" component={User} />

                      <Route path="/admin/bikeMap" component={BikeMap} />

                      <Route path="/admin/echarts/bar" component={Bar} />
                      <Route path="/admin/echarts/pie" component={Pie} />
                      <Route path="/admin/echarts/line" component={Line} />

                      <Route component={NoMatch} />
                    </Switch>
                  </Admin>
                );
              }}
            ></Route>
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
            <Route path="/order/detail" component={Login}></Route>
            <Route component={NoMatch} />
          </Switch>
        </App>
      </HashRouter>
    );
  }
}
