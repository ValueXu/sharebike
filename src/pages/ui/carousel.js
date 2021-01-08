import React from "react";
import { Card, Carousel } from "antd";
import "./ui.less";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const imgStyle={
    height:"240px",
    width:"100%"
}

export default class carousel extends React.Component {
  render() {
    return (
      <div>
        <Card className="card-wrap" title="文字背景轮播" style={{width:'100%'}}>
          <Carousel autoplay effect="fade">
            <div style={{width:'100%', backgroundColor:'red'}}>
              <h3 style={contentStyle}>Ant Motion Banner - React</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Ant Motion Banner - Vue</h3>
            </div>
            <div>
              <h3 style={contentStyle}>Ant Motion Banner - Angular</h3>
            </div>
          </Carousel>
        </Card>
        <Card className="card-wrap" title="图片轮播">
          <Carousel effect="fade">
            <div>
              <img src="/carousel-img/carousel-1.jpg" style={imgStyle} alt="图片1"></img>
            </div>
            <div>
              <img src="/carousel-img/carousel-2.jpg" style={imgStyle} alt="图片2"></img>
            </div>
            <div>
              <img src="/carousel-img/carousel-3.jpg" style={imgStyle} alt="图片3"></img>
            </div>
          </Carousel>
        </Card>
      </div>
    );
  }
}
