import React from "react";
import { Form, Input, Radio, DatePicker, Select } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export default class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={};
  }

  formRef = this.props.formRef;

  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    let type = this.props.type;
    let userInfo = this.props.userInfo || {};
    // console.log("userInfo", userInfo);
    return (
      <div>
        <Form
          ref={this.formRef}
          layout="horizontal"
          onFinish={this.props.onFinish}
        >
          <FormItem
            label="用户名"
            name="username"
            // initialValue={userInfo.username}
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            {type === "detail" ? (
              userInfo.username
            ) : (
              <Input type="text" placeholder="请输入用户名" />
            )}
          </FormItem>
          <FormItem
            label="性别"
            name="sex"
            // initialValue={userInfo.sex}
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请选择性别",
              },
            ]}
          >
            {type === "detail" ? (
              userInfo.sex === 1 ? (
                "男"
              ) : (
                "女"
              )
            ) : (
              <RadioGroup>
                <Radio value={1}>男</Radio>
                <Radio value={2}>女</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="状态"
            name="state"
            // initialValue={userInfo.state}
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请选择状态",
              },
            ]}
          >
            {type === "detail" ? (
              (() => {
                switch (userInfo.state) {
                  case 1: {
                    return "前端";
                  }
                  case 2: {
                    return "后端";
                  }
                  case 3: {
                    return "北大才子";
                  }
                  case 4: {
                    return "项目主管";
                  }
                  case 5: {
                    return "创业者";
                  }
                  default: {
                    return "";
                  }
                }
              })()
            ) : (
              <Select>
                <Option value={1}>前端</Option>
                <Option value={2}>后端</Option>
                <Option value={3}>北大才子</Option>
                <Option value={4}>项目主管</Option>
                <Option value={5}>创业者</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="生日"
            name="birthday"
            // initialValue={moment(userInfo.birthday)}
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请选择生日",
              },
            ]}
          >
            {type === "detail" ? userInfo.birthday : <DatePicker />}
          </FormItem>
          <FormItem
            label="联系地址"
            name="address"
            // initialValue={userInfo.address}
            {...formItemLayout}
            rules={[
              {
                required: true,
                message: "请输入联系地址",
              },
            ]}
          >
            {type === "detail" ? (
              userInfo.address
            ) : (
              <TextArea rows={3} placeholder="请输入联系地址" />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}
