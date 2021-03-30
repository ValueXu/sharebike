import React from "react";
import { Row, Card, Col, Modal } from "antd";
import "./ui.less";

export default class Gallery extends React.Component {
  state = {
    currentImg: "",
    isVisible: false,
  };

  openGallery = (imgSrc) => {
    this.setState({
      currentImg: imgSrc,
      isVisible: true,
    });
  };

  render() {
    const imgs = [
      ["1.png", "2.png", "3.png", "4.png", "5.png"],
      ["6.png", "7.png", "8.png", "9.png", "10.png"],
      ["11.png", "12.png", "13.png", "14.png", "15.png"],
      ["16.png", "17.png", "18.png", "19.png", "20.png"],
      ["21.png", "22.png", "23.png", "24.png", "25.png"],
    ];
    const imgList = imgs.map((list) => {
      return list.map((item) => {
        return (
          <Card
            style={{ marginBottom: 10 }}
            cover={<img src={"/gallery/" + item} alt={item}></img>}
            onClick={() => {
              this.openGallery("/gallery/" + item);
            }}
          >
            <Card.Meta
              title={`图片${item}`}
              description="欢迎来到ValueXu的React系统"
            />
          </Card>
        );
      });
    });
    return (
      <div className="card-wrap">
        <Row gutter={20}>
          <Col span={5}>{imgList[0]}</Col>
          <Col span={5}>{imgList[1]}</Col>
          <Col span={5}>{imgList[2]}</Col>
          <Col span={5}>{imgList[3]}</Col>
          <Col span={4}>{imgList[4]}</Col>
        </Row>
        <Modal
        width={500}
        height={600}
        title='图片详情'
          visible={this.state.isVisible}
          onCancel={() => {
            this.setState({
              isVisible: false,
            });
          }}
          footer={null}
        >
          <img src={this.state.currentImg} alt="" style={{width:"100%"}} />
        </Modal>
      </div>
    );
  }
}
