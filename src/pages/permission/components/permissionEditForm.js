import React, { Component } from "react";
import { Form, Input, Select, Tree } from "antd";

import menuList from "../../../config/menuConfig";

const FormItem = Form.Item;
const Option = Select.Option;

export default class PermissionEditForm extends Component {
  constructor(props) {
    super(props);
    this.setState({});
    this.formRef = this.props.formRef;
    this.treeData = [
      {
        title: "平台权限",
        key: "/",
        children: this.renderTree(menuList),
      },
    ];
  }

  renderTree = (menuList = []) => {
    return menuList.map((item) => {
      if (item.children) {
        return {
          title: item.title,
          key: item.key,
          children: this.renderTree(item.children),
        };
      }
      return { title: item.title, key: item.key };
    });
  };

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const detail_info = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <div>
        <Form
          ref={this.formRef}
          layout="horizontal"
          onFinish={this.props.onFinish}
        >
          <FormItem label="角色名称" name="role_name" {...formItemLayout}>
            <Input
              disabled
              type="text"
              placeholder={detail_info.role_name || ""}
            />
          </FormItem>
          <FormItem
            label="状态"
            name="status"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请选择状态",
              },
            ]}
          >
            <Select>
              <Option value={1}>启用</Option>
              <Option value={0}>停用</Option>
            </Select>
          </FormItem>
          <Tree
            checkable
            defaultExpandAll
            onSelect={() => {}}
            onCheck={(checkedKeys) => {
              this.onCheck(checkedKeys);
            }}
            checkedKeys={menuInfo}
            treeData={this.treeData}
          />
        </Form>
      </div>
    );
  }
}
