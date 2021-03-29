import React from "react";
import { Form, Input, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

export default class RoleForm extends React.Component {
  constructor(props) {
    super(props);
    this.setState({});
    this.formRef = this.props.formRef;
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };

    return (
      <div>
        <Form
          ref={this.formRef}
          layout="horizontal"
          onFinish={this.props.onFinish}
        >
          <FormItem
            label="角色名"
            name="role_name"
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请输入角色名称",
              },
            ]}
          >
            <Input type="text" placeholder="请输入用户名" />
          </FormItem>
          <FormItem
            label="状态"
            name="state"
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
        </Form>
      </div>
    );
  }
}
