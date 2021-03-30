import React from "react";
import { Form, Input, Button } from "antd";

const FormItem = Form.Item;

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ref = this.props.formRef;

  loginSubmit = (e) => {
    e && e.preventDefault();
    const _this = this;
    this.ref.current.validateFields().then((values) => {
      var formValue = _this.ref.current.getFieldsValue();
      _this.props.loginSubmit({
        username: formValue.username,
        password: formValue.password,
      });
    });
  };

  checkUsername = (_, value) => {
    var reg = /^\w+$/;
    if (!reg.test(value)) {
      return Promise.reject(new Error("用户名只允许输入英文字母或数字"));
    } else {
      return Promise.resolve();
    }
  };

  checkPassword = (_, value) => {
    var reg = /^\w+$/;
    if (!reg.test(value)) {
      return Promise.reject(new Error("密码只允许输入英文字母或数字"));
    } else {
      return Promise.resolve();
    }
  };

  render() {
    return (
      <Form className="login-form" ref={this.ref}>
        <FormItem
          name="username"
          rules={[
            {
              validator: this.checkUsername,
            },
          ]}
        >
          <Input placeholder="用户名" />
        </FormItem>
        <FormItem
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input type="password" placeholder="密码" />
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={this.loginSubmit}
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    );
  }
}
