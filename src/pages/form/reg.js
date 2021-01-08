import React from "react";
import {
  Card,
  Form,
  Radio,
  Button,
  Input,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  InputNumber,
  Checkbox,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  PlusOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import moment from "moment";
import dataPickerLocal from "antd/lib/date-picker/locale/zh_CN";
import timePickerLocal from "antd/lib/time-picker/locale/zh_CN";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const TextArea = Input.TextArea;

const formItemLayout = {
  labelCol: {
    xs: 24,
    sm: 4,
  },
  wrapperCol: {
    xs: 24,
    sm: 12,
  },
};

const offsetLayout = {
  labelCol: {
    xs: 24,
    sm: 4,
  },
  wrapperCol: {
    xs: 24,
    sm: {
      span: 12,
      offset: 4,
    },
  },
};

const rowObject = {
  minRows: 2,
  maxRows: 6,
};

export default class FormReg extends React.Component {
  state = {
    loading: false,
    readPolicy: false,
  };
  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({
        loading: true,
      });
      return;
    }
    if (info.file.status === "done") {
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  resiveFileList = (e) => {
    console.log("上传事件：", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  handleSubmit = (values) => {
    console.log("表格传递的数据为：", values);
  };
  render() {
    return (
      <div>
        <Card title="注册表单">
          <Form
            layout="horizontal"
            onFinish={this.handleSubmit}
            initialValues={{
              'sex': "3",
              'age': "18",
              'state': "2",
              'interest': ["2", "5"],
              'isMarried': false,
              'birthday': moment("2020-8-8"),
              'address':
                "江西省南昌市青山湖区蛟桥镇玉屏大街江西财经大学麦庐园校区",
            }}
          >
            <FormItem
              {...formItemLayout}
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
                  message: "长度应在5-10",
                },
                {
                  pattern: /^\w+$/g,
                  message: "用户名必须为英文字母或者数字",
                },
              ]}
            >
              {
                <Input
                  prefix={<UserOutlined />}
                  placeholder="请输入用户名"
                ></Input>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
              name="userpwd"
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            >
              {
                <Input
                type="password"
                  prefix={<LockOutlined />}
                  placeholder="请输入密码"
                ></Input>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="性别" name="sex">
              {
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                  <Radio value="3">未知</Radio>
                </RadioGroup>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="年龄" name="age">
              {<InputNumber />}
            </FormItem>
            <FormItem {...formItemLayout} label="当前状态" name="state">
              {
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子</Option>
                  <Option value="4">高管</Option>
                  <Option value="5">创业者</Option>
                </Select>
              }
            </FormItem>
            <FormItem {...formItemLayout} label="爱好" name="interest">
              {
                <Select mode="multiple">
                  <Option value="1">游泳</Option>
                  <Option value="2">打篮球</Option>
                  <Option value="3">爬山</Option>
                  <Option value="4">踢足球</Option>
                  <Option value="5">骑行</Option>
                  <Option value="6">桌球</Option>
                  <Option value="7">麦霸</Option>
                  <Option value="8">跑步</Option>
                </Select>
              }
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="是否已婚"
              name="isMarried"
              valuePropName="checked"
            >
              {<Switch />}
            </FormItem>
            <FormItem {...formItemLayout} label="生日" name="birthday">
              {
                <DatePicker
                  showTime
                  locale={dataPickerLocal}
                  format="YYYY-MM-DD"
                />
              }
            </FormItem>
            <FormItem {...formItemLayout} label="联系地址" name="address">
              {<TextArea autoSize={rowObject} />}
            </FormItem>
            <FormItem {...formItemLayout} label="早期时间" name="time">
              {<TimePicker locale={timePickerLocal} />}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="头像"
              name="userImg"
              valuePropName="fileList"
              getValueFromEvent={this.resiveFileList}
            >
              {
                <Upload
                  listType="picture-card"
                  showUploadList={false}
                  onChange={this.handleChange}
                  action={"https://www.mocky.io/v2/5cc8019d300000980a055e76"}
                >
                  {this.state.imageUrl ? (
                    <img
                      src={this.state.imageUrl}
                      alt=""
                      style={{ width: "100%" }}
                    />
                  ) : this.state.loading ? (
                    <LoadingOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                </Upload>
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                <Checkbox
                  onChange={(e) => {
                    this.setState({ readPolicy: e.target.checked });
                  }}
                >
                  我已阅读过
                  <a href="/admin/form/reg" alt="用户协议">
                    用户协议
                  </a>
                </Checkbox>
              }
            </FormItem>
            <FormItem {...offsetLayout}>
              {
                <Button
                  disabled={!this.state.readPolicy}
                  type="primary"
                  htmlType="submit"
                >
                  注册
                </Button>
              }
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}
