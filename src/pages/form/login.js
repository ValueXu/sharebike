import React from "react";
import { Card, Form, Input, Button, message, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const FormItem = Form.Item;

const layout = {
  //label标签布局
  labelCol: {
    span: 8,
  },
  //输入控件布局
  wrapperCol: {
    span: 8,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class FormLogin extends React.Component {
  onFinish = (values) => {
    message.success(
      "用户名：" + values.username + "   密码：" + values.password
    );
  };

  onFinishFailed = (errorInfo) => {
    message.error("错误：" + errorInfo);
  };

  render() {
    return (
      <div>
        <Card title="登录表单">
          <Form
            {...layout}
            name="form"
            initialValues={{
              rember: true,
            }}
            onFinish={(values) => this.onFinish(values)}
            onFinishFailed={(errorInfo) => this.onFinishFailed(errorInfo)}
          >
            <FormItem
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
                {
                  min: 5,
                  max: 10,
                  message: "长度不在范围内",
                },
                {
                  pattern: /^\w+$/g,
                  message: "用户名必须为英文字母或者数字",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </FormItem>
            <FormItem
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入密码"
              />
            </FormItem>
            <FormItem {...tailLayout}>
              <FormItem name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </FormItem>
              <a href="/admin/form/login" style={{display:'inline', marginLeft:'25%', color: "#FFDB29" }}>
                忘记密码
              </a>
            </FormItem>
            <FormItem {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
