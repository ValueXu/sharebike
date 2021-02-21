/* eslint-disable no-undef */
import React from "react";
import { Card } from "antd";
import axios from "../../axios";

import "./detail.less";

export default class OrderDetail extends React.Component {
  state = {
    orderInfo: {},
  };
  componentDidMount() {
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      this.getDetailId(orderId);
    }
  }
  getDetailId = (orderId) => {
    axios
      .ajax({
        url: "order/detail",
        data: {
          params: {
            orderId: orderId,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState({
            orderInfo: res.result,
          });
          this.renderMap(res.result);
        }
      });
  };

  renderMap = (result) => {
    // 此处在index.html中引入了百度地图的API，可以直接使用BMap
    this.map = new window.BMapGL.Map("orderDetailMap");
    // this.map.centerAndZoom("北京", 11);
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list);
    // 调用服务区绘制方法
    this.drawServiceArea(result.area);
  };
  addMapControl = () => {
    let map = this.map;
    map.addControl(
      new window.BMapGL.ScaleControl({ anchor: BMAP_ANCHOR_TOP_RIGHT })
    );
    map.addControl(
      new window.BMapGL.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT })
    );
  };
  // 绘制用户的行驶路线
  drawBikeRoute = (positionList) => {
    let map = this.map,
      startPoint = "",
      endPoint = "";
    if (positionList.length > 0) {
      let first = positionList[0],
        last = positionList[positionList.length - 1];

      // 绘制开始地点
      startPoint = new window.BMapGL.Point(first.lon, first.lat);
      let startIcon = new window.BMapGL.Icon(
        "/assets/start_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imgSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42),
        }
      );
      let startMarker = new window.BMapGL.Marker(startPoint, {
        icon: startIcon,
      });
      map.addOverlay(startMarker);

      // 绘制结束地点
      endPoint = new window.BMapGL.Point(last.lon, last.lat);
      let endIcon = new window.BMapGL.Icon(
        "/assets/end_point.png",
        new window.BMapGL.Size(36, 42),
        {
          imgSize: new window.BMapGL.Size(36, 42),
          anchor: new window.BMapGL.Size(36, 42),
        }
      );
      let endMarker = new window.BMapGL.Marker(endPoint, {
        icon: endIcon,
      });
      map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
      }
      const polyline = new window.BMapGL.Polyline(trackPoint, {
        strokeColor: "#1869AD",
        strokeWeight: 3,
        strokeOpacity: 1,
      });
      map.addOverlay(polyline);

      // 设置地图中心
      map.centerAndZoom(endPoint, 11);
    } else {
      map.centerAndZoom("北京", 11);
    }
  };

  // 绘制服务区
  drawServiceArea = (position_list) => {
    let map = this.map;
    // 绘制服务区
    let trackPoint = [];
    for (let i = 0; i < position_list.length; i++) {
      let point = position_list[i];
      trackPoint.push(new window.BMapGL.Point(point.lon, point.lat));
    }
    const polyGon = new window.BMapGL.Polygon(trackPoint, {
      strokeColor: "#CE0000",
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: "#ff8605",
      fillOpacity: 0.4,
    });
    map.addOverlay(polyGon);
  };

  render() {
    const info = this.state.orderInfo || {};
    return (
      <div style={{ width: "90%", margin: "30px auto" }}>
        <Card>
          <div id="orderDetailMap" className="order-map"></div>
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {info.mode === 1 ? "服务区" : "停车点"}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {info.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
