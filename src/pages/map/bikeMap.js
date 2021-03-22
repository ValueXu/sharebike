import { Card } from "antd";
import axios from "../../axios/index";
import React from "react";
import BaseForm from "../../component/BaseForm/baseForm";

export default class BikeMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total_count: 0,
    };
  }

  formList = [
    {
      type: "城市",
      label: "城市",
      field: "city",
      placeholder: "全部",
      width: 80,
      initialValue: 0,
      list: [
        { id: 0, name: "全部" },
        { id: 1, name: "北京" },
        { id: 2, name: "天津" },
        { id: 3, name: "上海" },
        { id: 4, name: "杭州" },
      ],
    },
    {
      type: "时间查询",
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      initialValue: 0,
      list: [
        {
          id: 0,
          name: "全部",
        },
        {
          id: 1,
          name: "进行中",
        },
        {
          id: 2,
          name: "行程结束",
        },
      ],
      width: 100,
    },
  ];

  params = {};

  searchRef = React.createRef();

  requestList = () => {
    axios
      .ajax({
        url: "/map/bike_list",
        data: {
          params: this.params,
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState({
            total_count: res.result.total_count,
          });
          this.renderMap(res);
        }
      });
  };

  handleFilterSubmit = (filterParams) => {
    this.params = filterParams;
    console.log(this.params);
    this.requestList();
  };

  renderMap = (res) => {
    let list = res.result.route_list;
    this.map = new window.BMapGL.Map("container");
    let gps1 = list[0].split(",");
    let startPoint = new window.BMapGL.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(",");
    let endPoint = new window.BMapGL.Point(gps2[0], gps2[1]);
    this.map.centerAndZoom(endPoint, 11);
    this.map.addControl(
      // eslint-disable-next-line no-undef
      new window.BMapGL.ScaleControl({ anchor: BMAP_ANCHOR_TOP_RIGHT })
    );
    this.map.addControl(
      // eslint-disable-next-line no-undef
      new window.BMapGL.NavigationControl({ anchor: BMAP_ANCHOR_TOP_RIGHT })
    );

    // 设置开始地点的图片
    let startIcon = new window.BMapGL.Icon(
      "/assets/start_point.png",
      new window.BMapGL.Size(36, 42),
      {
        imgSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    let bikeMarkerStart = new window.BMapGL.Marker(startPoint, {
      icon: startIcon,
    });
    // 设置结束地点的图片
    let endIcon = new window.BMapGL.Icon(
      "/assets/end_point.png",
      new window.BMapGL.Size(36, 42),
      {
        imgSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    let bikeMarkerEnd = new window.BMapGL.Marker(endPoint, {
      icon: endIcon,
    });
    // 绘制开始和结束地址的图片
    this.map.addOverlay(bikeMarkerStart);
    this.map.addOverlay(bikeMarkerEnd);

    // 绘制车辆行驶路线
    let routeList = [];
    list.forEach((item, _) => {
      let p = item.split(",");
      routeList.push(new window.BMapGL.Point(p[0], p[1]));
    });
    let polyLine = new window.BMapGL.Polyline(routeList, {
      strokeColor: "#ef4136",
      strokeWeight: 2,
      strokeOpacity: 1,
    });
    this.map.addOverlay(polyLine);

    // 绘制服务区
    let servicePointList = [];
    let serviceList = res.result.service_list;
    serviceList.forEach((item) => {
      servicePointList.push(new window.BMapGL.Point(item.lon, item.lat));
    });
    let polyServiceGon = new window.BMapGL.Polyline(servicePointList, {
      strokeColor: "#ef4136",
      strokeWeight: 3,
      strokeOpacity: 1,
    });
    this.map.addOverlay(polyServiceGon);

    // 绘制地图中自行车图标
    let bikeList = res.result.bike_list;
    let bikeIcon = new window.BMapGL.Icon(
      "/assets/bike.jpg",
      new window.BMapGL.Size(36, 42),
      {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(18, 42),
      }
    );
    bikeList.forEach((item) => {
      let p = item.split(",");
      let point = new window.BMapGL.Point(p[0], p[1]);
      let bikeMarker = new window.BMapGL.Marker(point, {
        icon: bikeIcon,
      });
      this.map.addOverlay(bikeMarker);
    });
  };

  componentDidMount() {
    this.requestList();
  }

  render() {
    return (
      <div>
        <Card>
          <BaseForm
            formRef={this.searchRef}
            formList={this.formList}
            filterSubmit={this.handleFilterSubmit}
          />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: 500 }}></div>
        </Card>
      </div>
    );
  }
}
