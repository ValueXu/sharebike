import { Button } from "antd";
import React from "react";
import { Card, Modal } from "antd";
import "./ui.less";

export default class modals extends React.Component {
    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    };

    handleOpen = (type) => {
        this.setState({
            [type]: true,
        });
    };

    handleConfirm = (type) => {
        Modal[type]({
            title: "确认？",
            content: "许伟的React系统的确认框",
            OnOk() {
                console.log("Ok");
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    render() {
        return (
            <div>
                <br />
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
                        Open
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
                        自定义页脚
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
                        顶部20px弹框
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
                        水平垂直居中
                    </Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button
                        type="primary"
                        onClick={() => this.handleConfirm("confirm")}
                    >
                        Confirm
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleConfirm("info")}
                    >
                        Info
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleConfirm("success")}
                    >
                        Success
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleConfirm("warning")}
                    >
                        Warning
                    </Button>
                </Card>
                <Modal
                    title="Open"
                    visible={this.state.showModal1}
                    onCancel={() => {
                        this.setState({
                            showModal1: false,
                        });
                    }}
                >
                    <p> 欢迎来到许伟的React系统 </p>
                </Modal>
                <Modal
                    title="自定义页脚"
                    visible={this.state.showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModal2: false,
                        });
                    }}
                >
                    <p> 欢迎来到许伟的React系统 </p>
                </Modal>
                <Modal
                    style={{
                        top: 10,
                    }}
                    title="顶部20px"
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false,
                        });
                    }}
                >
                    <p> 欢迎来到许伟的React系统 </p>
                </Modal>
                <Modal
                    title="水平垂直居中"
                    wrapClassName="vertical-center-modal"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false,
                        });
                    }}
                >
                    <p> 欢迎来到许伟的React系统 </p>
                </Modal>
            </div>
        );
    }
}
