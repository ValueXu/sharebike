import React from "react";
import { Card, Button, Modal, Table, message } from "antd";
import axios from "../../axios";
import utils from "./../../utils/utils";
import FilterForm from "./component/filterForm";
import OpenCityForm from "./component/openCityForm";

export default class City extends React.Component {
  state = {
    list: [],
    isShowOpenCity: false,
  };

  params = {
    page: 1,
  };

  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios
      .ajax({
        url: "/open_city",
        data: {
          params: {
            page: this.params.page,
          },
        },
      })
      .then((res) => {
        this.setState({
          list: res.result.item_list.map((item, index) => {
            item.key = index;
            return item;
          }),
          pagination: utils.pagination(res, (current) => {
            _this.params.page = current;
            _this.requestList();
          }),
        });
      });
  };

  componentDidMount() {
    this.requestList();
  }

  handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true,
    });
  };

  formRef = React.createRef();

  handleSubmit = () => {
    const openCityForm = this.formRef.current;
    const _this = this;
    openCityForm
      .validateFields()
      .then((values) => {
        console.log("values of opencity form: ", values);
        axios
          .ajax({
            url: "/city/open",
            data: {
              params: values,
            },
          })
          .then((res) => {
            if (res.code === "0") {
              message.success({
                content: res.result,
              });
              _this.setState({ isShowOpenCity: false });
              _this.requestList();
            }
          })
          .catch((e) => {
            message.error({ content: e });
          });
      })
      .catch((info) => {
        message.info({
          content: "开通城市表单验证失败，请检查输入内容",
        });
      });
  };
  render() {
    const columns = [
      {
        title: "城市ID",
        dataIndex: "id",
      },
      {
        title: "城市名称",
        dataIndex: "name",
      },
      {
        title: "用车模式",
        dataIndex: "mode",
        render(mode) {
          return mode === 1 ? "停车点" : "禁停区";
        },
      },
      {
        title: "营运模式",
        dataIndex: "op_mode",
        render(op_mode) {
          return op_mode === 1 ? "自营" : "加盟";
        },
      },
      {
        title: "授权加盟商",
        dataIndex: "franchisee_name",
      },
      {
        title: "城市管理员",
        dataIndex: "city_admins",
        render(arr) {
          return arr
            .map((item) => {
              return item.username;
            })
            .join("，");
        },
      },
      {
        title: "城市开通时间",
        dataIndex: "open_time",
      },
      {
        title: "操作时间",
        dataIndex: "update_time",
        render: utils.formateDate,
      },
      {
        title: "操作人",
        dataIndex: "sys_user_name",
      },
    ];
    return (
      <div>
        <Card>
          <FilterForm />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        <div className="content-wrap">
          <Table
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({ isShowOpenCity: false });
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm formRef={this.formRef} />
        </Modal>
      </div>
    );
  }
}
