import React from "react";
import { Card, Button, Modal, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import axios from "../../axios/index";
import Utils from "../../utils/utils";
import ETable from "../../component/ETable/eTable";
import BaseForm from "../../component/BaseForm/baseForm";
import UserForm from "./component/userForm";

import moment from "moment";

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  componentDidMount() {
    this.requestList();
  }

  state = {
    list: [],
    selectedIds: [],
    selectedItem: [],
    selectedRowKeys: [],
    pagination: {},
    isModalVisible: false,
    type: "",
  };

  formList = [
    {
      type: "INPUT",
      label: "用户名",
      field: "user_name",
      placeholder: "请输入用户名",
      width: 100,
    },
    {
      type: "DATEPICKER",
      label: "请选择入职日期",
      field: "user_date",
      placeholder: "请选择日期",
    },
    {
      type: "INPUT",
      label: "用户手机号",
      field: "user_mobile",
      placeholder: "请输入用户手机号",
      width: 100,
    },
  ];

  // 员工列表的查询表单的实体
  filterRef = React.createRef();

  // 员工管理功能菜单的表单的实体
  userManageRef = React.createRef();

  // 提交列表筛选
  handleFilter = (params) => {
    this.params = params;
    this.requestList();
  };

  params = {
    page: 1,
  };

  // 请求列表
  requestList = () => {
    // 清除选择的项
    this.setState({
      selectedIds: [],
      selectedItem: [],
      selectedRowKeys: [],
    });
    axios.requestList(this, "/user/list", this.params);
  };

  // 提交模态框的操作类型
  handleOperate = (type) => {
    let item = this.state.selectedItem;
    switch (type) {
      case "create": {
        this.setState({
          type,
          isModalVisible: true,
          title: "创建员工",
        });
        break;
      }
      case "edit": {
        if (!item) {
          Modal.info({
            title: "提示",
            content: "请选择一个用户",
          });
          return;
        }

        this.setState(
          {
            type,
            isModalVisible: true,
            title: "编辑员工",
            userInfo: item,
          },
          // 表单更新后，将表单的默认值设置成选中的行
          this.userManageRef.current.setFieldsValue({
            username: item.username,
            sex: item.sex,
            state: item.state,
            birthday: moment(item.birthday),
            address: item.address,
          })
        );
        break;
      }
      case "detail": {
        this.setState({
          type,
          isModalVisible: true,
          title: "员工详情",
          userInfo: item,
        });
        break;
      }
      case "delete": {
        if (item.length === 0) {
          Modal.info({
            title: "提示",
            content: "请选择一个用户",
          });
          break;
        }
        let _this = this;
        Modal.confirm({
          title: "确认删除",
          content: "是否要删除当前选中的员工",
          onOk() {
            axios
              .ajax({
                url: "/user/delete",
                data: {
                  params: {
                    id: item.id,
                  },
                },
              })
              .then((res) => {
                if (res.code === "0") {
                  _this.setState({
                    isModalVisible: false,
                  });
                  message.success({
                    content: "删除成功",
                  });
                  _this.requestList();
                } else {
                  message.error({
                    content: "删除失败",
                  });
                }
              });
          },
        });
        break;
      }
      default:
        break;
    }
  };

  // 提交模态框的表单
  handleSubmit = () => {
    // 表单的值
    let formValues;
    // 对表单进行校验并传值
    this.userManageRef.current
      .validateFields()
      .then((values) => {
        // 成功之后
        formValues = values;
        let type = this.state.type;
        axios
          .ajax({
            url: type === "create" ? "/user/add" : "/user/edit",
            data: {
              params: formValues,
            },
          })
          .then((res) => {
            if (res.code === "0") {
              this.setState(
                {
                  isModalVisible: false,
                },
                () => {
                  message.success({
                    content: "提交成功",
                  });
                  this.requestList();
                }
              );
              this.userManageRef.current.resetFields();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
      },
      {
        title: "用户名",
        dataIndex: "username",
      },
      {
        title: "性别",
        dataIndex: "sex",
        render(sex) {
          return sex === 1 ? "男" : "女";
        },
      },
      {
        title: "状态",
        dataIndex: "state",
        render(state) {
          return {
            1: "前端",
            2: "后端",
            3: "北大才子",
            4: "百度HR",
            5: "创业者",
          }[state];
        },
      },
      {
        title: "爱好",
        dataIndex: "interest",
        render(interest) {
          return {
            1: "游泳",
            2: "篮球",
            3: "足球",
            4: "跑步",
            5: "爬山",
            6: "骑行",
            7: "桌球",
            8: "麦霸",
          }[interest];
        },
      },
      {
        title: "生日",
        dataIndex: "birthday",
      },
      {
        title: "联系地址",
        dataIndex: "address",
      },
      {
        title: "早起时间",
        dataIndex: "time",
      },
    ];

    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
            formRef={this.filterRef}
            filterSubmit={this.handleFilter}
          />
        </Card>
        <Card>
          <Card style={{ marginTop: 10 }}>
            <Button
              onClick={() => {
                this.handleOperate("create");
              }}
              className="operate-wrap"
              icon={<PlusOutlined />}
              type="primary"
            >
              创建员工
            </Button>
            <Button
              onClick={() => this.handleOperate("edit")}
              className="operate-wrap"
              icon={<EditOutlined />}
              type="primary"
            >
              编辑员工
            </Button>
            <Button
              onClick={() => {
                this.handleOperate("detail");
              }}
              className="operate-wrap"
              icon={<InfoCircleOutlined />}
              type="primary"
            >
              员工详情
            </Button>
            <Button
              type="primary"
              onClick={() => this.handleOperate("delete")}
              icon={<DeleteOutlined />}
              className="operate-wrap"
            >
              删除员工
            </Button>
          </Card>
          <div className="content-wrap">
            <ETable
              updateSelectedItem={Utils.updateSelectedItem.bind(this)}
              columns={columns}
              dataSource={this.state.list}
              selectedRowKeys={this.state.selectedRowKeys}
              selectedItem={this.state.selectedItem}
              pagination={this.state.pagination}
            />
          </div>
        </Card>
        <Modal
          // 为防止modal未打开过导致没有render使得里面的表单域第一次调用为null，将其强制渲染
          forceRender
          title={this.state.title}
          visible={this.state.isModalVisible}
          onOk={this.handleSubmit}
          onCancel={() => {
            this.setState({ isModalVisible: false });
            this.userManageRef.current.resetFields();
          }}
          width={800}
          footer={(() => {
            if (this.state.type === "detail") {
              return null;
            }
          })()}
        >
          <UserForm
            type={this.state.type}
            formRef={this.userManageRef}
            onFinish={this.handleSubmit}
            userInfo={this.state.userInfo}
          />
        </Modal>
      </div>
    );
  }
}
