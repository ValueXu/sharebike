import React from "react";
import { Row, Col } from "antd";
import "./index.less";
import Util from "../../utils/utils";
import axios from "axios";
import { connect } from "react-redux";

class Header extends React.Component {
  state = {};
  componentDidMount() {
    this.setState({
      username: "ValueXu",
    });
    setInterval(() => {
      let sysTime = Util.formateDate(new Date().getTime());
      this.setState({
        sysTime,
      });
    }, 1000);
    this.getWeatherAPIData();
  }

  getWeatherAPIData() {
    const cityCode = "360100",
      ak = "RiymcRGffl73ffEsnvN5Zai4LYiqAzLp"; //citycode行政编码
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://api.map.baidu.com/weather/v1/?district_id=${cityCode}&data_type=all&ak=${ak}`
      ) //此处用了coros-anywhere.herokuapp.com来跨域获取天气数据，百度地图不支持浏览器端使用XMLHttp获取天气，用的服务器端获取数据的网址
      .then((result) => {
        if (result.status === 200) {
          this.setState({
            weather: result.data.result.now.text,
            // dayPictureUrl:
          });
        }
      })
      .catch((err) => {
        console.log("天气获取错误：" + err);
      });
  }
  render() {
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {menuType ? (
            <Col span="6" className="logo">
              <img src="/assets/logo-ant.svg" alt="" />
              <span>共享单车管理系统</span>
            </Col>
          ) : (
            ""
          )}
          <Col span={menuType ? "18" : "24"}>
            <span>欢迎，{this.state.username}</span>
            <a href="/#/login">退出</a>
          </Col>
        </Row>
        {menuType ? (
          ""
        ) : (
          <Row className="breadcrumb">
            <Col span="4" className="breadcrumb-title">
              {this.props.menuName}
            </Col>
            <Col span="20" className="weather">
              <span className="date">{this.state.sysTime}</span>
              {/* <span className="weather-img">
                            <img src="#" alt="天气图片"/>
                        </span> */}
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

// 简化Redux参数的调用
const mapStateToProps = (state) => {
  return {
    menuName: state.menuName,
  };
};

export default connect(mapStateToProps)(Header);
