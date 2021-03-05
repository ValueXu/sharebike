import React from "react";
import {
  Button,
  Card,
  // Form,
  // Select,
  Table,
} from "antd";
// import FilterForm from "./component/filterForm";
import axios from "../../axios";
import BaseForm from "../../component/BaseForm/baseForm";

// const FormItem=Form.Item;
// const Option=Select.Option;

export default class Order extends React.Component {
  state = {
    list: [],
  };
  params = {
    page: 1,
  };
  // 传递到BaseForm中的参数
  formList = [
    {
      type: "SELECT",
      label: "城市",
      field: "city",
      placeholder: "全部",
      list: [
        {
          id: "0",
          name: "全部",
        },
        {
          id: "1",
          name: "北京",
        },
        {
          id: "2",
          name: "天津",
        },
        {
          id: "3",
          name: "上海",
        },
      ],
      initialValue: "1",
      width: 80,
    },
    {
      type: "时间查询",
      field: "date_picker",
    },
    {
      type: "SELECT",
      label: "订单状态",
      field: "order_status",
      placeholder: "全部",
      list: [
        {
          id: "0",
          name: "全部",
        },
        {
          id: "1",
          name: "进行中",
        },
        {
          id: "2",
          name: "结束行程",
        },
      ],
      initialValue: "1",
      width: 80,
    },
  ];

  formRef = React.createRef();

  handleFilter = (params) => {
    this.params = { ...params, page: 1 };
    this.requestList();
  };

  requestList = () => {
    const _this = this;
    axios.requestList(_this, "/order/list", this.params);
    // axios
    //   .ajax({
    //     url: "/order/list",
    //     data: {
    //       params: _this.params,
    //     },
    //   })
    //   .then((res) => {
    //     if (res.code === "0") {
    //       let list = res.result.item_list.map((item, index) => {
    //         item.key = index;
    //         return item;
    //       });
    //       this.setState({
    //         list,
    //         pagination: Utils.pagination(res, (currentPage) => {
    //           _this.params.page = currentPage;
    //           _this.requestList();
    //         }),
    //       });
    //     }
    //   });
  };

  componentDidMount() {
    this.requestList();
  }

  // 打开订单模态框
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
          {/* <FilterForm/> */}
          <BaseForm
            formList={this.formList}
            formRef={this.formRef}
            filterSubmit={this.handleFilter}
          />
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
