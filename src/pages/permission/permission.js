import React, { Component } from "react";
import { Card, Button, Modal, message } from "antd";
import ETable from "../../component/ETable/eTable";
import Utils from "../../utils/utils";
import axios from "../../axios/index";
import RoleForm from "./components/roleForm";
import PermissionEditForm from "./components/permissionEditForm";

export default class Permission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isRoleModalVisible: false,
      isPermissionModalVisible: false,
    };
    this.roleRef = React.createRef();
    this.permissionEditRef = React.createRef();
    this.params = {
      page: 1,
    };
  }

  componentDidMount() {
    this.requestList();
  }

  handleRole = () => {
    this.setState({
      isRoleModalVisible: true,
    });
  };

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

  requestList = (params = this.params) => {
    axios.requestList(this, "/role/list", params);
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
          <Button type="primary" style={{ marginRight: 20 }}>
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
          width={800}
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
      </div>
    );
  }
}
