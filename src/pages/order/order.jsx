import React from "react";
import {
  Button,
  Card,
  Form,
  // Select,
  Modal,
  Table,
  message,
} from "antd";
// import FilterForm from "./component/filterForm";
import axios from "../../axios";
import BaseForm from "../../component/BaseForm/baseForm";

const FormItem = Form.Item;
// const Option=Select.Option;

export default class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      orderInfo: {},
      orderConfirmVisble: false,
      selectedRowKeys: [],
      selectedItem: [],
    };
  }
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

  // 提交查询
  handleFilter = (params) => {
    this.params = { ...params, page: 1 };
    this.requestList();
  };

  // 点击选中行或者表格行触发的事件
  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record,
    });
  };

  // 打开订单详情
  openOrderDetail = () => {
    let item = this.state.selectedItem;
    if (item.length === 0) {
      Modal.info({
        title: "信息",
        content: "请先选中一条订单",
      });
      return;
    }
    window.open(`/#/common/order/detail/${item.id}`, "_blank");
  };

  // 打开需要结束的订单的详情界面
  handleConfirm = () => {
    let item = this.state.selectedItem;
    if (item.length === 0) {
      Modal.info({
        title: "信息",
        content: "请选择一条订单进行结束",
      });
      return;
    }
    axios
      .ajax({
        url: "/order/ebike_info",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState({
            orderInfo: res.result,
            orderConfirmVisble: true,
          });
        }
      });
  };

  // 确认提交要结束的订单
  handleFinishOrder = () => {
    let item = this.state.selectedItem;
    axios
      .ajax({
        url: "/order/finish_order",
        data: {
          params: {
            orderId: item.id,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          message.success("订单结束成功");
          this.setState({
            orderConfirmVisble: false,
          });
          this.requestList();
        }
      });
  };

  componentDidMount() {
    this.requestList();
  }

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
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: "radio",
      selectedRowKeys: selectedRowKeys,
      onChange: (index, record) => {
        // 参数相反，需要换一下
        this.onRowClick(record[0], index[0]);
      },
    };
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
          <Button
            onClick={this.openOrderDetail}
            style={{ marginRight: 20 }}
            type="primary"
          >
            订单详情
          </Button>
          <Button onClick={this.handleConfirm}>结束订单</Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              //onRow表示选中行之后的操作；record: 数据链 index: 索引
              return {
                onClick: () => {
                  this.onRowClick(record, index);
                },
              };
            }}
          />
        </div>
        <Modal
          title="结束订单"
          visible={this.state.orderConfirmVisble}
          onCancel={() => {
            this.setState({
              orderConfirmVisble: false,
            });
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout="horizontal">
            <FormItem label="车辆编号" {...formItemLayout}>
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem label="剩余电量" {...formItemLayout}>
              {this.state.orderInfo.battery + "%"}
            </FormItem>
            <FormItem label="行程开始时间" {...formItemLayout}>
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem label="当前位置" {...formItemLayout}>
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
