import React, { Component } from "react";
import { Card, Button, Modal, message } from "antd";
import ETable from "../../component/ETable/eTable";
import Utils from "../../utils/utils";
import axios from "../../axios/index";
import RoleForm from "./components/roleForm";
import PermissionEditForm from "./components/permissionEditForm";
import RoleAuthForm from "./components/roleAuthForm";

export default class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isRoleModalVisible: false,
      isPermissionModalVisible: false,
      isUserModalVisible: false,
    };
    this.roleRef = React.createRef();
    this.permissionEditRef = React.createRef();
    this.roleAuthRef = React.createRef();
    this.params = {
      page: 1,
    };
  }

  requestList = (params = this.params) => {
    axios.requestList(this, "/role/list", params);
  };

  componentDidMount() {
    this.requestList();
  }

  // 打开【创建用户】模态框
  handleRole = () => {
    this.setState({
      isRoleModalVisible: true,
    });
  };

  // 提交【创建用户】
  handleRoleSubmit = () => {
    let data = this.roleRef.current.getFieldsValue(true);
    axios
      .ajax({
        url: "/role/create",
        data: {
          params: data,
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState(
            {
              isRoleModalVisible: false,
            },
            () => {
              message.success({
                content: "创建成功",
              });
            }
          );
          this.requestList();
        }
      });
  };

  // 打开【设置权限】模态框
  handlePermission = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "提示",
        content: "请选择一个角色",
      });
      return;
    }
    this.setState(
      {
        isPermissionModalVisible: true,
        detailInfo: item,
        // 设置Tree的初始值
        menuInfo: item.menus,
      },
      () => {
        this.permissionEditRef.current.setFieldsValue({
          role_name: this.state.selectedItem.role_name,
          status: this.state.selectedItem.status,
        });
      }
    );
  };

  // 提交【设置权限】模态框
  handlePermissionSubmit = () => {
    let data = this.permissionEditRef.current.getFieldsValue(true);
    data.role_id = this.state.selectedItem.id;
    data.menus = this.state.menuInfo;
    axios
      .ajax({
        url: "/role/edit",
        data: {
          params: {
            ...data,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState(
            {
              isPermissionModalVisible: false,
            },
            () => {
              message.success({
                content: "更改权限成功",
              });
            }
          );
          this.requestList();
        }
      });
  };

  // 打开【用户授权】模态框
  handleUserAuth = () => {
    let item = this.state.selectedItem;
    if (!item) {
      Modal.info({
        title: "提示",
        content: "请选择一个角色",
      });
      return;
    }
    this.setState(
      {
        detailInfo: item,
      },
      () => {
        this.getRoleUserList(item.id);
      }
    );
  };

  // 获取当前用户的授权信息
  getRoleUserList = (id) => {
    axios
      .ajax({
        url: "/role/user_list",
        data: {
          params: {
            id,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          this.setState({
            isUserModalVisible: true,
          });
          this.getAuthUserList(res.result);
        }
      });
  };

  // 筛选用户类型
  getAuthUserList = (dataSource) => {
    let mockData = [];
    const targetKeys = [];
    if (dataSource && dataSource.length > 0) {
      mockData = dataSource.map((item) => {
        const data = {
          key: item.user_id,
          title: item.user_name,
          status: item.status,
        };
        if (data.status === 1) {
          targetKeys.push(data.key);
        }
        return data;
      });
      this.setState({
        mockData,
        targetKeys,
      });
    }
  };

  // 提交【用户授权】模态框
  handleUserAuthSubmit = () => {
    let data = {};
    data.user_ids = this.state.targetKeys;
    data.role_id = this.state.selectedItem.id;
    axios
      .ajax({
        url: "/role/user_role_edit",
        data: {
          params: {
            ...data,
          },
        },
      })
      .then((res) => {
        if (res.code === "0") {
          message.success({
            content: "授权成功",
          });
          this.setState({
            isUserModalVisible: false,
          });
          this.requestList();
        }
      });
  };

  render() {
    const columns = [
      {
        title: "角色ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "角色名称",
        dataIndex: "role_name",
        key: "role_name",
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        render: Utils.formateDate,
        key: "create_time",
      },
      {
        title: "使用状态",
        dataIndex: "status",
        render(status) {
          return status === 1 ? "启用" : "停用";
        },
        key: "status",
      },
      {
        title: "授权时间",
        dataIndex: "authorize_time",
        render: Utils.formateDate,
        key: "authorize_time",
      },
      {
        title: "授权人",
        dataIndex: "authorize_user_name",
        key: "authorize_user_name",
      },
    ];
    return (
      <div>
        <Card>
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={this.handleRole}
          >
            创建角色
          </Button>
          <Button
            type="primary"
            style={{ marginRight: 20 }}
            onClick={this.handlePermission}
          >
            设置权限
          </Button>
          <Button
            type="primary"
            onClick={this.handleUserAuth}
            style={{ marginRight: 20 }}
          >
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            rowSelection="radio"
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            onSelectChange={() => {}}
            dataSource={this.state.list}
            columns={columns}
            pagination={this.state.pagination}
          />
        </div>
        <Modal
          // 为防止modal未打开过导致没有render使得里面的表单域第一次调用为null，将其强制渲染
          // forceRender
          title="创建角色"
          visible={this.state.isRoleModalVisible}
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            this.setState({ isRoleModalVisible: false });
            this.roleRef.current.resetFields();
          }}
          width={380}
        >
          <RoleForm
            // type={this.state.type}
            formRef={this.roleRef}
            onFinish={this.handleRoleSubmit}
          />
        </Modal>
        <Modal
          title="设置权限"
          visible={this.state.isPermissionModalVisible}
          width={600}
          onOk={this.handlePermissionSubmit}
          onCancel={() => {
            this.setState({
              isPermissionModalVisible: false,
            });
          }}
        >
          <PermissionEditForm
            // type={this.state.type}
            formRef={this.permissionEditRef}
            onFinish={this.handlePermissionSubmit}
            detailInfo={this.state.detailInfo}
            menuInfo={this.state.menuInfo}
            patchMenuInfo={(checkedKeys) => {
              this.setState({
                menuInfo: checkedKeys,
              });
            }}
          />
        </Modal>
        <Modal
          title="用户授权"
          visible={this.state.isUserModalVisible}
          width={800}
          onOk={this.handleUserAuthSubmit}
          onCancel={() => {
            this.setState({
              isUserModalVisible: false,
            });
          }}
        >
          <RoleAuthForm
            // type={this.state.type}
            formRef={this.roleAuthRef}
            onFinish={this.handlePermissionSubmit}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={(targetKeys) => {
              this.setState({
                targetKeys,
              });
            }}
          />
        </Modal>
      </div>
    );
  }
}
