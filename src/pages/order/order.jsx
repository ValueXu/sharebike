import React from "react";
import { Button, Card, Form, Select, Table } from "antd";
import FilterForm from "./component/filterForm";
import axios from "../../axios";
import Utils from "../../utils/utils";

// const FormItem=Form.Item;
// const Option=Select.Option;

export default class Order extends React.Component {
  state = {
    list: [],
  };
  params = {
    page: 1,
  };
  requestList = () => {
    const _this = this;
    axios
      .ajax({
        url: "/order/list",
        params: {
          page: this.params.page,
        },
      })
      .then((res) => {
        if (res.code === "0") {
          let list = res.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          });
          this.setState({
            list,
            pagination: Utils.pagination(res, (currentPage) => {
              _this.params.page = currentPage;
              _this.requestList();
            }),
          });
        }
      });
  };
  componentDidMount() {
    this.requestList();
  }
  openOrderDetail = () => {
    const orderId = 123;
    window.open(`/#/common/order/detail/${orderId}`, "_blank");
  };
  render() {
    const columns = [
      {
        title: "订单编号",
        dataIndex: "order_sn",
      },
      {
        title: "车辆编号",
        dataIndex: "bike_sn",
      },
      {
        title: "用户名",
        dataIndex: "user_name",
      },
      {
        title: "手机号码",
        dataIndex: "mobile",
      },
      {
        title: "里程",
        dataIndex: "distance",
      },
      {
        title: "行驶时长",
        dataIndex: "total_time",
      },
      {
        title: "状态",
        dataIndex: "status",
      },
      {
        title: "开始时间",
        dataIndex: "start_time",
      },
      {
        title: "结束时间",
        dataIndex: "end_time",
      },
      {
        title: "订单金额",
        dataIndex: "total_fee",
      },
      {
        title: "实付金额",
        dataIndex: "user_pay",
      },
    ];
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button onClick={this.openOrderDetail}>订单详情</Button>
          <Button>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}