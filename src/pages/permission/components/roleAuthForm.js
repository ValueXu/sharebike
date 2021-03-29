import React, { Component } from "react";

import { Form, Input, Transfer } from "antd";

const FormItem = Form.Item;

export default class RoleAuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      mockData: [],
    };
    this.formRef = this.props.formRef;
  }

  componentDidMount() {
    this.setState({
      mockData: this.props.mockData,
      targetKeys: this.props.targetKeys,
    });
  }

  onChange = (targetKeys) => {
    this.props.patchUserInfo(targetKeys);
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const detail_info = this.props.detailInfo;
    return (
      <div>
        <Form layout="horizontal" ref={this.formRef}>
          <FormItem label="角色名称" {...formItemLayout}>
            <Input disabled placeholder={detail_info.role_name} />
          </FormItem>
          <FormItem label="选择用户" {...formItemLayout}>
            <Transfer
              listStyle={{ width: 200, height: 400 }}
              dataSource={this.props.mockData}
              targetKeys={this.props.targetKeys}
              titles={["待选用户", "已选用户"]}
              showSearch
              filterOption={(value, options) =>
                options.title.indexOf(value) > -1
              }
              onChange={this.onChange}
              render={(item) => item.title}
            />
          </FormItem>
        </Form>
      </div>
    );
  }
}
