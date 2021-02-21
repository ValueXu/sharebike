import React from "react";
import { Form, Select } from "antd";

const FormItem = Form.Item;
const Option = Select.Option;

// 添加城市模态框的表单
class OpenCityForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
      },
      wrapperCOl: {
        span: 19,
      },
    };
    return (
      <Form
        ref={this.props.formRef}
        layout="horizontal"
      >
        <FormItem
          label="选择城市"
          {...formItemLayout}
          name="city_id"
          initialValue="1"
        >
          <Select style={{ width: 100 }}>
            <Option value="">全部</Option>
            <Option value="1">北京市</Option>
            <Option value="2">天津市</Option>
          </Select>
        </FormItem>
        <FormItem
          label="运营模式"
          {...formItemLayout}
          name="op_mode"
          initialValue="1"
        >
          <Select style={{ width: 100 }}>
            <Option value="1">自营</Option>
            <Option value="2">加盟</Option>
          </Select>
        </FormItem>
        <FormItem
          label="用车模式"
          {...formItemLayout}
          name="use_mode"
          initialValue="1"
        >
          <Select style={{ width: 100 }}>
            <Option value="1">指定停车点</Option>
            <Option value="2">禁停区</Option>
          </Select>
        </FormItem>
      </Form>
    );
  }
}

export default OpenCityForm;
